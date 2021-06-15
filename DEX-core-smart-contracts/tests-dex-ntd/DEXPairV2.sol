pragma ton-solidity ^0.45.0;
pragma AbiHeader expire;
pragma AbiHeader pubkey;
pragma AbiHeader time;

import "./DEXConnector.sol";
import "./interfaces/IRootTokenContract.sol";
import "./interfaces/ITONTokenWallet.sol";
import "./interfaces/ITokensReceivedCallback.sol";
import "./interfaces/IBurnTokensCallback.sol";
import "./interfaces/IDEXConnector.sol";
import "./interfaces/IDEXConnect.sol";
import "./interfaces/IDEXClient.sol";
import "./interfaces/IDEXPair.sol";

contract DEXPair is IDEXPair, IDEXConnect, ITokensReceivedCallback, IBurnTokensCallback  {

  // Pair data
  address static public rootDEX;
  uint256 static public soUINT;
  address static public creator;
  TvmCell static public codeDEXConnector;
  address static public rootA;
  address static public rootB;
  address static public rootAB;

  mapping(address => address) public walletReserve;
  mapping(address => bool) public syncStatus;
  mapping(address => uint128) public balanceReserve;

  uint128 public totalSupply;

  mapping(address => mapping(address => bool)) public processingStatus;
  mapping(address => mapping(address => uint128)) public processingData;
  mapping(address => mapping(address => address)) public processingDest;

  struct Connector {
    address root_address;
    uint256 souint;
    bool status;
  }

  mapping (address => address) public rootConnector;
  mapping (address => Connector) public connectors;

  struct Callback {
    address token_wallet;
    address token_root;
    uint128 amount;
    uint256 sender_public_key;
    address sender_address;
    address sender_wallet;
    address original_gas_to;
    uint128 updated_balance;
    uint8 payload_arg0;
    address payload_arg1;
    address payload_arg2;
  }

  uint public counterCallback;
  mapping (uint => Callback) callbacks;

  // Grams constants
  uint128 constant GRAMS_SET_CALLBACK_ADDR = 500000000;
  uint128 constant GRAMS_SEND_UNUSED_RETURN = 200000000;
  uint128 constant GRAMS_MINT = 200000000;
  uint128 constant GRAMS_RETURN = 200000000;

  // Modifier that allows public function to accept any external calls.
  modifier alwaysAccept {
    tvm.accept();
    _;
  }

  modifier checkOwnerAndAccept {
    require(msg.sender == rootDEX, 102);
    tvm.accept();
    _;
  }

  modifier checkPubKeyAndAccept {
    require(msg.pubkey() == tvm.pubkey(), 103);
    tvm.accept();
    _;
  }


  constructor(uint256 souintA, uint256 souintB, uint128 gramsDeployConnector, uint128 gramsDeployWallet) public checkOwnerAndAccept {
    counterCallback = 0;
    connectRoot(rootA, souintA, gramsDeployConnector, gramsDeployWallet);
    connectRoot(rootB, souintB, gramsDeployConnector, gramsDeployWallet);
  }

  // Function to compute DEX Connector address for connect to TON Token Wallet of Root Token Contract.
  function computeConnectorAddress(uint256 souint) private inline view returns (address) {
    TvmCell stateInit = tvm.buildStateInit({
      contr: DEXConnector,
      varInit: { soUINT: souint, dexclient: address(this) },
      code: codeDEXConnector,
      pubkey: tvm.pubkey()
    });
    return address(tvm.hash(stateInit));
  }

  // Function to give DEX Connector address for connect to TON Token Wallet of Root Token Contract.
  function getConnectorAddress(uint256 connectorSoArg) public view responsible returns (address) {
    return { value: 0, bounce: false, flag: 64 } computeConnectorAddress( connectorSoArg);
  }

  // Function to connect DEX Pair to TON Token Wallet of Root Token Contract.
  function connectRoot(address root, uint256 souint, uint128 gramsToConnector, uint128 gramsToRoot) private inline {
    TvmCell stateInit = tvm.buildStateInit({
      contr: DEXConnector,
      varInit: { soUINT: souint, dexclient: address(this) },
      code: codeDEXConnector,
      pubkey: tvm.pubkey()
    });
    TvmCell init = tvm.encodeBody(DEXConnector);
    address connector = tvm.deploy(stateInit, init, gramsToConnector, address(this).wid);
    Connector cr = connectors[connector];
    cr.root_address = root;
    cr.souint = souint;
    cr.status = false;
    connectors[connector] = cr;
    TvmCell body = tvm.encodeBody(IDEXConnector(connector).deployEmptyWallet, root);
    connector.transfer({value:gramsToRoot, bounce:true, body:body});
  }

  // Function to callbacks from DEX Connector about connected TON Token Wallet of Root Token Contract.
  function connectCallback(address wallet) public override alwaysAccept {
    address connector = msg.sender;
    if (connectors.exists(connector)) {
      Connector cr = connectors[connector];
      walletReserve[cr.root_address] = wallet;
      syncStatus[cr.root_address] = true;
      rootConnector[cr.root_address] = connector;
      TvmCell bodySTC = tvm.encodeBody(IDEXConnector(connector).setTransferCallback);
      connector.transfer({value: GRAMS_SET_CALLBACK_ADDR, bounce:true, flag: 0, body:bodySTC});
      TvmCell bodySBC = tvm.encodeBody(IDEXConnector(connector).setBouncedCallback);
      connector.transfer({value: GRAMS_SET_CALLBACK_ADDR, bounce:true, flag: 0, body:bodySBC});
      cr.status = true;
      connectors[connector] = cr;
    }
  }

  // Function to connect DEX Client to DEX Pair.
  function connect() public override {
    address dexclient = msg.sender;
    tvm.rawReserve(address(this).balance - msg.value, 2);
    TvmCell body = tvm.encodeBody(IDEXClient(dexclient).setPair, rootA, walletReserve[rootA], rootB, walletReserve[rootB], rootAB);
    dexclient.transfer({ value: 0, flag: 128, body:body});
  }

  // Function to get amountOut for swap from amountIn .
  function getAmountOut(uint128 amountIn, address rootIn, address rootOut) private inline view returns (uint128){
    uint128 amountInWithFee = math.muldiv(amountIn,997,1);
    uint128 numerator = math.muldiv(amountInWithFee,balanceReserve[rootOut],1);
    uint128 denominator = amountInWithFee + math.muldiv(balanceReserve[rootIn],1000,1);
    return math.muldiv(1,numerator,denominator);
  }

  // Function to calculate qty B asset for qty A asset base on current pair reserves
  function qtyBforA(uint128 amountA) private inline view returns (uint128) {
    require(amountA > 0, 105);
    require(balanceReserve[rootA] > 0 && balanceReserve[rootB] > 0, 106);
    return math.muldiv(amountA, balanceReserve[rootB], balanceReserve[rootA]);
  }

  // Function to calculate qty A asset for qty B asset base on current pair reserves
  function qtyAforB(uint128 amountB) private inline view returns (uint128) {
    require(amountB > 0, 107);
    require(balanceReserve[rootA] > 0 && balanceReserve[rootB] > 0, 106);
    return math.muldiv(amountB, balanceReserve[rootA], balanceReserve[rootB]);
  }

  // Function to calculate qty LP tokens for asset A base on current pair reserves and totalSupply
  function liquidityA(uint128 amountA) private inline view returns (uint128) {
    require(amountA > 0, 105);
    require(totalSupply > 0, 110);
    require(balanceReserve[rootA] > 0, 108);
    return math.muldiv(amountA, totalSupply, balanceReserve[rootA]);
  }

  // Function to calculate qty LP tokens for asset B base on current pair reserves and totalSupply
  function liquidityB(uint128 amountB) private inline view returns (uint128) {
    require(amountB > 0, 105);
    require(totalSupply > 0, 110);
    require(balanceReserve[rootB] > 0, 109);
    return math.muldiv(amountB, totalSupply, balanceReserve[rootB]);
  }

  // Function to clean processsing data
  function cleanProcessing(address dexclient) private inline {
    delete processingStatus[rootA][dexclient];
    delete processingStatus[rootB][dexclient];
    delete processingData[rootA][dexclient];
    delete processingData[rootB][dexclient];
    delete processingDest[rootA][dexclient];
    delete processingDest[rootB][dexclient];
  }

  // Function to callback from TON Token Wallet of Root Token Contract to DEX Pair.
  function tokensReceivedCallback(
    address token_wallet,
    address token_root,
    uint128 amount,
    uint256 sender_public_key,
    address sender_address,
    address sender_wallet,
    address original_gas_to,
    uint128 updated_balance,
    TvmCell payload
  ) public override alwaysAccept {
    if (msg.sender == walletReserve[rootA] || msg.sender == walletReserve[rootB]) {

      Callback cc = callbacks[counterCallback];
      cc.token_wallet = token_wallet;
      cc.token_root = token_root;
      cc.amount = amount;
      cc.sender_public_key = sender_public_key;
      cc.sender_address = sender_address;
      cc.sender_wallet = sender_wallet;
      cc.original_gas_to = original_gas_to;
      cc.updated_balance = updated_balance;
      TvmSlice slice = payload.toSlice();
      (uint8 arg0, address arg1, address arg2) = slice.decode(uint8, address, address);
      cc.payload_arg0 = arg0;
      cc.payload_arg1 = arg1;
      cc.payload_arg2 = arg2;
      callbacks[counterCallback] = cc;
      counterCallback++;

      if (arg0 == 1) {
        tvm.rawReserve(address(this).balance - msg.value, 2);
        uint128 amountOut = getAmountOut(amount, token_root, arg1);
        if (!(amountOut > balanceReserve[arg1])){
          balanceReserve[token_root] += amount;
          balanceReserve[arg1] -= amountOut;
          syncStatus[token_root] = balanceReserve[token_root] == updated_balance ? true : false;
          TvmBuilder builder;
          builder.store(uint8(0), address(0), address(0));
          TvmCell new_payload = builder.toCell();
          TvmCell body = tvm.encodeBody(IDEXConnector(rootConnector[arg1]).transfer, arg2, amountOut, new_payload);
          rootConnector[arg1].transfer({value: 0, bounce:true, flag: 128, body:body});
        } else {
          TvmBuilder builder;
          builder.store(uint8(8), address(0), address(0));
          TvmCell new_payload = builder.toCell();
          TvmCell body = tvm.encodeBody(IDEXConnector(rootConnector[token_root]).transfer, token_wallet, amount, new_payload);
          rootConnector[token_root].transfer({value: 0, bounce:true, flag: 128, body:body});
        }
      }

      if (arg0 == 2) {
        tvm.rawReserve(address(this).balance - msg.value, 2);
        processingStatus[token_root][arg1] = true;
        processingData[token_root][arg1] += amount;
        processingDest[token_root][arg1] = sender_wallet;

        if (processingStatus[rootA][arg1] == true && processingStatus[rootB][arg1] == true) {
          uint128 amountA = processingData[rootA][arg1];
          uint128 amountB = processingData[rootB][arg1];
          if (totalSupply == 0 && balanceReserve[rootA] == 0 && balanceReserve[rootB] == 0) {
            uint128 liquidity = math.min(amountA,amountB);
            balanceReserve[rootA] += amountA;
            balanceReserve[rootB] += amountB;
            totalSupply += liquidity;
            TvmCell body = tvm.encodeBody(IRootTokenContract(rootAB).mint, liquidity, arg2);
            rootAB.transfer({value: GRAMS_MINT, bounce:true, body:body});
            cleanProcessing(arg1);
            arg1.transfer({ value: 0, flag: 128, body:body});
          } else {
            uint128 requiredAmountB = qtyBforA(amountA);
            if (!(requiredAmountB > amountB)) {
              uint128 provideA = amountA;
              uint128 provideB = requiredAmountB;
              uint128 unusedReturnB = amountB - provideB;
              balanceReserve[rootA] += provideA;
              balanceReserve[rootB] += provideB;
              uint128 liquidity = math.min(liquidityA(provideA), liquidityB(provideB));
              totalSupply += liquidity;
              TvmCell body = tvm.encodeBody(IRootTokenContract(rootAB).mint, liquidity, arg2);
              rootAB.transfer({value: GRAMS_MINT, bounce:true, body:body});
              if (unusedReturnB > 0) {
                TvmBuilder builder;
                builder.store(uint8(7), address(0), address(0));
                TvmCell new_payload = builder.toCell();
                TvmCell bodyB = tvm.encodeBody(IDEXConnector(rootConnector[rootB]).transfer, processingDest[rootB][arg1], unusedReturnB, new_payload);
                rootConnector[rootB].transfer({value: GRAMS_SEND_UNUSED_RETURN, bounce:true, body:bodyB});
                cleanProcessing(arg1);
                arg1.transfer({ value: 0, flag: 128});
              } else {
                cleanProcessing(arg1);
                arg1.transfer({ value: 0, flag: 128});
              }
            } else {
              uint128 requiredAmountA = qtyAforB(amountB);
              if (!(requiredAmountA > amountA)) {
                uint128 provideA = requiredAmountA;
                uint128 provideB = amountB;
                uint128 unusedReturnA = amountA - provideA;
                balanceReserve[rootA] += provideA;
                balanceReserve[rootB] += provideB;
                uint128 liquidity = math.min(liquidityA(provideA), liquidityB(provideB));
                totalSupply += liquidity;
                TvmCell body = tvm.encodeBody(IRootTokenContract(rootAB).mint, liquidity, arg2);
                rootAB.transfer({value: GRAMS_MINT, bounce:true, body:body});
                if (unusedReturnA > 0) {
                  TvmBuilder builder;
                  builder.store(uint8(7), address(0), address(0));
                  TvmCell new_payload = builder.toCell();
                  TvmCell bodyA = tvm.encodeBody(IDEXConnector(rootConnector[rootA]).transfer, processingDest[rootA][arg1], unusedReturnA, new_payload);
                  rootConnector[rootA].transfer({value: GRAMS_SEND_UNUSED_RETURN, bounce:true, body:bodyA});
                  cleanProcessing(arg1);
                  arg1.transfer({ value: 0, flag: 128});
                } else {
                  cleanProcessing(arg1);
                  arg1.transfer({ value: 0, flag: 128});
                }
              } else {
                TvmBuilder builder;
                builder.store(uint8(9), address(0), address(0));
                TvmCell new_payload = builder.toCell();
                TvmCell bodyA = tvm.encodeBody(IDEXConnector(rootConnector[rootA]).transfer, processingDest[rootA][arg1], amountA, new_payload);
                TvmCell bodyB = tvm.encodeBody(IDEXConnector(rootConnector[rootB]).transfer, processingDest[rootB][arg1], amountB, new_payload);
                rootConnector[rootA].transfer({value: GRAMS_SEND_UNUSED_RETURN, bounce:true, body:bodyA});
                rootConnector[rootB].transfer({value: GRAMS_SEND_UNUSED_RETURN, bounce:true, body:bodyB});
                cleanProcessing(arg1);
                arg1.transfer({ value: 0, flag: 128});
              }
            }
          }
        }
      }
    }
  }

function burnCallback(
  uint128 tokens,
  TvmCell payload,
  uint256 sender_public_key,
  address sender_address,
  address wallet_address,
  address send_gas_to
) public override alwaysAccept {
  if (msg.sender == rootAB) {
    tvm.rawReserve(address(this).balance - msg.value, 2);
    TvmSlice slice = payload.toSlice();
    (uint8 arg0, address arg1, address arg2) = slice.decode(uint8, address, address);
    counterCallback++;
    Callback cc = callbacks[counterCallback];
    cc.token_wallet = wallet_address;
    cc.token_root = msg.sender;
    cc.amount = tokens;
    cc.sender_public_key = sender_public_key;
    cc.sender_address = sender_address;
    cc.sender_wallet = wallet_address;
    cc.original_gas_to = address(0);
    cc.updated_balance = 0;
    cc.payload_arg0 = arg0;
    cc.payload_arg1 = arg1;
    cc.payload_arg2 = arg2;
    callbacks[counterCallback] = cc;
    if (arg0 == 3 && arg1 != address(0) && arg2 != address(0)) {
      uint128 returnA = math.muldiv(balanceReserve[rootA],tokens,totalSupply);
      uint128 returnB = math.muldiv(balanceReserve[rootB],tokens,totalSupply);
      if (!(returnA > balanceReserve[rootA]) && !(returnB > balanceReserve[rootB])) {
        totalSupply -= tokens;
        balanceReserve[rootA] -= returnA;
        balanceReserve[rootB] -= returnB;
        TvmBuilder builder;
        builder.store(uint8(6), address(0), address(0));
        TvmCell new_payload = builder.toCell();
        TvmCell bodyA = tvm.encodeBody(IDEXConnector(rootConnector[rootA]).transfer, arg1, returnA, new_payload);
        TvmCell bodyB = tvm.encodeBody(IDEXConnector(rootConnector[rootB]).transfer, arg2, returnB, new_payload);
        rootConnector[rootA].transfer({value: GRAMS_RETURN, bounce:true, body:bodyA});
        rootConnector[rootB].transfer({value: GRAMS_RETURN, bounce:true, body:bodyB});
        send_gas_to.transfer({value: 0, bounce:true, flag: 128});
      }
    }
  }
}

function getCallback(uint id) public view checkPubKeyAndAccept returns (
  address token_wallet,
  address token_root,
  uint128 amount,
  uint256 sender_public_key,
  address sender_address,
  address sender_wallet,
  address original_gas_to,
  uint128 updated_balance,
  uint8 payload_arg0,
  address payload_arg1,
  address payload_arg2
){
  Callback cc = callbacks[id];
  token_wallet = cc.token_wallet;
  token_root = cc.token_root;
  amount = cc.amount;
  sender_public_key = cc.sender_public_key;
  sender_address = cc.sender_address;
  sender_wallet = cc.sender_wallet;
  original_gas_to = cc.original_gas_to;
  updated_balance = cc.updated_balance;
  payload_arg0 = cc.payload_arg0;
  payload_arg1 = cc.payload_arg1;
  payload_arg2 = cc.payload_arg2;
}

function getBalance() public pure checkPubKeyAndAccept returns (uint128 balance){
  balance = address(this).balance;
}

function resetProcessing(address dexclient) public  checkPubKeyAndAccept {
  delete processingStatus[rootA][dexclient];
  delete processingStatus[rootB][dexclient];
  delete processingData[rootA][dexclient];
  delete processingData[rootB][dexclient];
  delete processingDest[rootA][dexclient];
  delete processingDest[rootB][dexclient];

}


// Function to receive plain transfers.
receive() external {
}

}
