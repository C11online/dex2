pragma ton-solidity ^0.43.0;
pragma AbiHeader expire;
pragma AbiHeader pubkey;
pragma AbiHeader time;

import "./DEXConnector.sol";
import "./interfaces/IRootTokenContract.sol";
import "./interfaces/ITONTokenWallet.sol";
import "./interfaces/ITokensReceivedCallback.sol";
import "./interfaces/IDEXConnector.sol";
import "./interfaces/IDEXClient.sol";

contract DEXClient is ITokensReceivedCallback, IDEXClient {

  uint256 static public soUINT;
  TvmCell static public codeDEXConnector;

  // Grams constants
  uint128 constant GRAMS_SET_CALLBACK_ADDR = 500000000;

  struct Root {
      address root_address;
      uint256 souint;
      bool status;
  }

  mapping (address => address) public roots;
  mapping (address => address) public rootConnector;
  mapping (address => Root) public connectors;

  struct Callback {
    address token_wallet;
    address token_root;
    uint128 amount;
    uint256 sender_public_key;
    address sender_address;
    address sender_wallet;
    address original_gas_to;
    uint128 updated_balance;
    uint8 payload_type;
    address payload_root;
    address payload_wallet;
  }

  uint public counterCallback;
  mapping (uint => Callback) callbacks;

  // Modifier that allows public function to accept any external calls.
	modifier alwaysAccept {
		tvm.accept();
		_;
	}

  modifier checkOwnerAndAccept {
    require(msg.pubkey() == tvm.pubkey(), 102);
    tvm.accept();
    _;
  }

  constructor() public checkOwnerAndAccept {
    counterCallback = 0;
  }

  /*
  * Public functions
  */

  function computeConnectorAddress(uint256 souint) private inline view returns (address) {
      TvmCell stateInit = tvm.buildStateInit({
      contr: DEXConnector,
      varInit: { soUINT: souint, dexclient: address(this) },
      code: codeDEXConnector,
      pubkey: tvm.pubkey()
      });
      return address(tvm.hash(stateInit));
  }

  function getConnectorAddress(uint256 connectorSoArg) public view responsible returns (address) {
      return { value: 0, bounce: false, flag: 64 } computeConnectorAddress( connectorSoArg);
  }

  function connectRoot(address root, uint256 souint, uint128 gramsToConnector, uint128 gramsToRoot) public checkOwnerAndAccept returns (bool statusConnected){
    statusConnected = false;
    if (!roots.exists(root)) {
      TvmCell stateInit = tvm.buildStateInit({
			contr: DEXConnector,
			varInit: { soUINT: souint, dexclient: address(this) },
			code: codeDEXConnector,
			pubkey: tvm.pubkey()
		  });
      TvmCell init = tvm.encodeBody(DEXConnector);
      address connector = tvm.deploy(stateInit, init, gramsToConnector, address(this).wid);
      Root cr = connectors[connector];
      cr.root_address = root;
      cr.souint = souint;
      cr.status = false;
      connectors[connector] = cr;
      TvmCell body = tvm.encodeBody(IDEXConnector(connector).deployEmptyWallet, root);
      connector.transfer({value:gramsToRoot, bounce:true, body:body});
      statusConnected = true;
    }
  }

  function connectCallback(address wallet) public override alwaysAccept {
    address connector = msg.sender;
    if (connectors.exists(connector)) {
    Root cr = connectors[connector];
    roots[cr.root_address] = wallet;
    rootConnector[cr.root_address] = connector;
    TvmCell bodySTC = tvm.encodeBody(IDEXConnector(connector).setTransferCallback);
    connector.transfer({value: GRAMS_SET_CALLBACK_ADDR, bounce:true, flag: 0, body:bodySTC});
    TvmCell bodySBC = tvm.encodeBody(IDEXConnector(connector).setBouncedCallback);
    connector.transfer({value: GRAMS_SET_CALLBACK_ADDR, bounce:true, flag: 0, body:bodySBC});
    cr.status = true;
    connectors[connector] = cr;
   }
  }

  function transferAB(address rootA, address rootB, address to, uint128 tokens, uint128 grams) public view checkOwnerAndAccept returns (bool statusTransfer) {
    statusTransfer = false;
    if (rootConnector.exists(rootA) && roots.exists(rootB)) {
      address connector = rootConnector[rootA];
      uint8 ptype = 0;
      TvmBuilder builder;
      builder.store(ptype, rootB, roots[rootB]);
      TvmCell payload = builder.toCell();
      TvmCell body = tvm.encodeBody(IDEXConnector(connector).transfer, to, tokens, payload);
      connector.transfer({value: grams, bounce:true, body:body});
      statusTransfer = true;
    }
  }

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
    counterCallback++;
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
    (uint8 ptype, address root, address wallet) = slice.decode(uint8, address, address);
    cc.payload_type = ptype;
    cc.payload_root = root;
    cc.payload_wallet = wallet;
    callbacks[counterCallback] = cc;
    if (ptype == 0) {
      tvm.rawReserve(address(this).balance - msg.value, 2);
      address connector = rootConnector[root];
      uint8 fptype = 1;
      TvmBuilder builder;
      builder.store(fptype, address(0), address(0));
      TvmCell fpayload = builder.toCell();
      TvmCell body = tvm.encodeBody(IDEXConnector(connector).transfer, wallet, amount, fpayload);
      connector.transfer({value: 0, bounce:true, flag: 128, body:body});
    }
  }

  function getCallback(uint id) public view checkOwnerAndAccept returns (
    address token_wallet,
    address token_root,
    uint128 amount,
    uint256 sender_public_key,
    address sender_address,
    address sender_wallet,
    address original_gas_to,
    uint128 updated_balance,
    uint8 payload_type,
    address payload_root,
    address payload_wallet
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
    payload_type = cc.payload_type;
    payload_root = cc.payload_root;
    payload_wallet = cc.payload_wallet;
  }


  function getBalance() public pure checkOwnerAndAccept returns (uint128 balance){
    balance = address(this).balance;
  }

  // Function to receive plain transfers.
  receive() external {
  }

}
