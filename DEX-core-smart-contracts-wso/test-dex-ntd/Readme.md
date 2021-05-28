# Smartcontracts and js scripts for deploy DefiSpace DEX (stage2)

## tvm_linker command for make TVMcell ready code  of sc for DEXRoot
/home/yaroslav/.tondev/solidity/tvm_linker decode --tvc DEXConnector.tvc | grep code: | cut -c 8- > DEXConnector.txt
/home/yaroslav/.tondev/solidity/tvm_linker decode --tvc DEXClient.tvc | grep code: | cut -c 8- > DEXClient.txt
/home/yaroslav/.tondev/solidity/tvm_linker decode --tvc DEXPair.tvc | grep code: | cut -c 8- > DEXPair.txt
/home/yaroslav/.tondev/solidity/tvm_linker decode --tvc RootTokenContract.tvc | grep code: | cut -c 8- > RootTokenContract.txt
/home/yaroslav/.tondev/solidity/tvm_linker decode --tvc TONTokenWallet.tvc | grep code: | cut -c 8- > TONTokenWallet.txt
/home/yaroslav/.tondev/solidity/tvm_linker decode --tvc Giver.tvc | grep code: | cut -c 8- > Giver.txt

## node deployWTON
address and keys will written to `WTONdata.json`

## node deployUSDT
address and keys will written to `USDTdata.json`

## node deployUSDC
address and keys will written to `USDCdata.json`

## node deployBTC
address and keys will written to `BTCdata.json`

## node deployETH
address and keys will written to `BTCdata.json`

## node root-deploy
address and keys from DEX Root will written to `DEXRootContract.json`
