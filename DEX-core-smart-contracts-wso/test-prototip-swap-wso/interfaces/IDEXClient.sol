pragma ton-solidity ^0.43.0;
pragma AbiHeader expire;
pragma AbiHeader pubkey;
pragma AbiHeader time;

interface IDEXClient {
  function connectCallback(address wallet) external;
}
