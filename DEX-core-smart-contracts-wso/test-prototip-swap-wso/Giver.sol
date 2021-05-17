pragma ton-solidity ^0.43.0;
pragma AbiHeader expire;
pragma AbiHeader pubkey;
pragma AbiHeader time;

contract Giver {

  modifier checkOwnerAndAccept {
    // Check that message was signed with contracts key.
    require(msg.pubkey() == tvm.pubkey(), 102);
    tvm.accept();
    _;
  }

  struct Income {
    uint32[] ts;
    uint128[] values;
    uint128 total;
  }

  struct Outgoing {
    uint32[] ts;
    uint128[] values;
    uint128 total;
  }

  mapping (address => Income) incomes;
  mapping (address => Outgoing) outgoings;

  /*
  * Public functions
  */

  function sendTransaction(address dest, uint128 value, bool bounce) public checkOwnerAndAccept {
    require(address(this).balance > value, 60);
    dest.transfer(value, bounce, 3);
    Outgoing o = outgoings[dest];
    uint32 ts = uint32(now);
    uint128 cv = o.total;
    o.ts.push(ts);
    o.values.push(value);
    o.total = cv + value;
    outgoings[dest] = o;
  }

  // Function to receive plain transfers.
  receive() external {
    uint32 ts = uint32(now);
    Income i = incomes[msg.sender];
    uint128 cv = i.total;
    i.ts.push(ts);
    i.values.push(msg.value);
    i.total = cv + msg.value;
    incomes[msg.sender] = i;
  }

  function getIncome(address sender) public view checkOwnerAndAccept returns (uint128 balance, uint32[] ts, uint128[] values){
    Income i = incomes[sender];
    balance = i.total;
    ts = i.ts;
    values = i.values;
  }

  function getOutgoing(address receiver) public view checkOwnerAndAccept returns (uint128 balance, uint32[] ts, uint128[] values){
    Outgoing o = outgoings[receiver];
    balance = o.total;
    ts = o.ts;
    values = o.values;
  }

  function getBalance() public pure checkOwnerAndAccept returns (uint128 balance){
    balance = address(this).balance;
  }

}
