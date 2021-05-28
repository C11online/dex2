# Smartcontracts for test swap speed into DEX prototip with sharding optimization

## tvm_linker
/home/yaroslav/.tondev/solidity/tvm_linker decode --tvc DEXConnector.tvc | grep code: | cut -c 8- > DEXConnector.txt
/home/yaroslav/.tondev/solidity/tvm_linker decode --tvc DEXClient.tvc | grep code: | cut -c 8- > DEXClient.txt
/home/yaroslav/.tondev/solidity/tvm_linker decode --tvc DEXPair.tvc | grep code: | cut -c 8- > DEXPair.txt
/home/yaroslav/.tondev/solidity/tvm_linker decode --tvc RootTokenContract.tvc | grep code: | cut -c 8- > RootTokenContract.txt
/home/yaroslav/.tondev/solidity/tvm_linker decode --tvc TONTokenWallet.tvc | grep code: | cut -c 8- > TONTokenWallet.txt
/home/yaroslav/.tondev/solidity/tvm_linker decode --tvc Giver.tvc | grep code: | cut -c 8- > Giver.txt
