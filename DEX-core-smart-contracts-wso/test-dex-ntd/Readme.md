# Smartcontracts and js scripts for deploy DefiSpace DEX (stage2)

## tvm_linker commands for make TVMcell ready code  of smartcontracts for DEXRoot
-`<your path to>`/tvm_linker decode --tvc DEXConnector.tvc | grep code: | cut -c 8- > DEXConnector.txt
-`<your path to>`/tvm_linker decode --tvc DEXClient.tvc | grep code: | cut -c 8- > DEXClient.txt
-`<your path to>`/tvm_linker decode --tvc DEXPair.tvc | grep code: | cut -c 8- > DEXPair.txt
-`<your path to>`/tvm_linker decode --tvc RootTokenContract.tvc | grep code: | cut -c 8- > RootTokenContract.txt
-`<your path to>`/tvm_linker decode --tvc TONTokenWallet.tvc | grep code: | cut -c 8- > TONTokenWallet.txt
-`<your path to>`/tvm_linker decode --tvc Giver.tvc | grep code: | cut -c 8- > Giver.txt

Copy and paste this into `DEXRootCode.js`

## npm install
install dependencies

## node deployWTON
address and keys will written to `WTONdata.json`

## node deployUSDT
address and keys will written to `USDTdata.json`

## node deployUSDC
address and keys will written to `USDCdata.json`

## node deployBTC
address and keys will written to `BTCdata.json`

## node deployETH
address and keys will written to `ETHdata.json`

## node root-deploy
address and keys for DEX Root will written to `DEXRootContract.json`

## node dc-predeploy
address, keys and sharding optimization argument(ClientSoArg) for DEX Client will written to `DEXClientContract.json`

## node giver-deploy
deploy Giver.sol with 100 TONs which will pay for DEXclient deploy, keys are the same from DEX Client

## node giver-send
giver transfer 40 TONs to DEXRoot before DEXClient deploy

## node dc-deploy
deploy DEX Client using 40 TONs

## node dc-dp0-predeploy
predeploy for `DEX Pair 0 WTON-USDT`, future address, keys, sharding optimization arguments(PairSoArg, RootSoArg, ConnectorSoArg0, ConnectorSoArg1) and Root LP name,symbol,decimals will written to `DEXPairContractTonUsdt.json`

## node dc-dp0-deploy
DEX Client deploy `DEX Pair 0 WTON-USDT`

## node dc-dp0-connect0
DEX Client step0 connect to `DEX Pair 0 WTON-USDT` at the end it will get by callback from `DEX Pair 0 WTON-USDT` root0, root1, rootLP

## node dc-dp0-connect1
DEX Client step1 connect to `DEX Pair 0 WTON-USDT` at the end it will deploy all wallets that need for work with `DEX Pair 0 WTON-USDT`

## node dc-dp0-mint
this script mint 2_000_000_000_000_000_000 nano `WTONs` and 1_000_000_000_000_000_000 nano `USDT` to DEX Client wallets for testing purpose

## node dc-dp0-provide
this script provide liquidity 2_000_000_000_000_000_000 nano `WTONs` and 2_000_000_000_000_000_000 nano `USDT` from DEX Client wallets to DEX Pair 0 and it mint LP tokens to DEX Client as proof of provide liquidity

## node dc-dp0-return
this script burn 1 000 000 000 nano DS-WTON/USDT LP tokens by DEX Client and DEX Pair return part of liquidity which is equal to burned tokens

## node dc-dp0-swapA
DEX Client swap 1 000 000 000 nano WTON to nano USDT

## node dc-dp0-swapB
DEX Client swap 498 499 751 nano USDT to nano WTON

## node root-get
Getter function

## node dc-get
Getter function

## node dc-dp0-get
Getter function

## node dc-dp0-balance
Getter function
