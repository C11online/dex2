pragma ton-solidity ^0.43.0;
pragma AbiHeader expire;
pragma AbiHeader pubkey;
pragma AbiHeader time;

import "./interfaces/IRootTokenContract.sol";
import "./interfaces/ITONTokenWallet.sol";
import "./interfaces/IExpectedWalletAddressCallback.sol";
import "./interfaces/IDEXConnector.sol";
import "./interfaces/IDEXClient.sol";

contract DEXConnector is IExpectedWalletAddressCallback, IDEXConnector {

  uint256 static public soUINT;
  address static public dexclient;

  // Grams constants
  uint128 constant GRAMS_TO_ROOT = 500000000;
  uint128 constant GRAMS_TO_NEW_WALLET = 250000000;

  address public drivenRoot;
  address public driven;
  bool public statusConnected;

  // Modifier that allows public function to accept any external calls.
	modifier alwaysAccept {
		tvm.accept();
		_;
	}

  modifier checkOwnerAndAccept {
    // Check that message from contract owner.
    require(msg.sender == dexclient, 101);
    tvm.accept();
    _;
  }

  constructor() public checkOwnerAndAccept {
      statusConnected = false;
  }

  /*
  * Public functions
  */

  function deployEmptyWallet(address root) public override {
    require(msg.sender == dexclient, 101);
    require(!(msg.value < GRAMS_TO_ROOT * 2), 103);
    tvm.rawReserve(address(this).balance - msg.value, 2);
    if (!statusConnected) {
      drivenRoot = root;
      TvmCell bodyD = tvm.encodeBody(IRootTokenContract(root).deployEmptyWallet, GRAMS_TO_NEW_WALLET, 0, address(this), dexclient);
      root.transfer({value:GRAMS_TO_ROOT, bounce:true, body:bodyD});
      TvmCell bodyA = tvm.encodeBody(IRootTokenContract(root).sendExpectedWalletAddress, 0, address(this), address(this));
      root.transfer({value:GRAMS_TO_ROOT, bounce:true, body:bodyA});
      dexclient.transfer({value: 0, bounce:true, flag: 128});
    } else {
      dexclient.transfer({value: 0, bounce:true, flag: 128});
    }
  }

  function expectedWalletAddressCallback(address wallet, uint256 wallet_public_key, address owner_address) public override {
    require(msg.sender == drivenRoot && wallet_public_key == 0 && owner_address == address(this), 102);
    tvm.rawReserve(address(this).balance - msg.value, 2);
    statusConnected = true;
    driven = wallet;
    TvmCell body = tvm.encodeBody(IDEXClient(dexclient).connectCallback, wallet);
    dexclient.transfer({value: 0, bounce:true, flag: 128, body:body});
  }

  function setTransferCallback() public override {
    require(msg.sender == dexclient, 101);
    tvm.rawReserve(address(this).balance - msg.value, 2);
    TvmCell body = tvm.encodeBody(ITONTokenWallet(driven).setReceiveCallback, dexclient, true);
    driven.transfer({value: 0, bounce:true, flag: 128, body:body});
  }

  function setBouncedCallback() public override {
    require(msg.sender == dexclient, 101);
    tvm.rawReserve(address(this).balance - msg.value, 2);
    TvmCell body = tvm.encodeBody(ITONTokenWallet(driven).setBouncedCallback, dexclient);
    driven.transfer({value: 0, bounce:true, flag: 128, body:body});
  }

  function transfer(address to, uint128 tokens, TvmCell payload) public override {
    require(msg.sender == dexclient, 101);
    tvm.rawReserve(address(this).balance - msg.value, 2);
    TvmCell body = tvm.encodeBody(ITONTokenWallet(driven).transfer, to, tokens, 0, dexclient, true, payload);
    driven.transfer({value: 0, bounce:true, flag: 128, body:body});
  }

  function getBalance() public pure checkOwnerAndAccept returns (uint128 balance){
    balance = address(this).balance;
  }

  // Function to receive plain transfers.
  receive() external {
  }

}
