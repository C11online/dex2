# Tests DefiSpace DEX (stage2)

### `cd <your path to dex2>/DEX-core-smart-contracts/dev-test-dex-ntd/`
### `npm install`
### `npm run test:swapA`
   * on line 1 set quantity A nanoTokens for swap `const qtyA = 5000000000000;`
   * at the end of the test:
   `    - DEX root address:  0:80b247a393f0b94007cf7d7f97a916924739334294950088548f70cb7f2a0369
        - current dexclient address:  0:8ca8a693957ec10611289da900050a6770391c13d8920879a169453fff3ace14
        - current dexpair address:  0:81bbfb35a41dddcbe467b18ab8344ca89cecb559df75b51889c26adde0a101cd
        - rate B / A before:  0.37742788143517875
        - swapA qty:5000000000000
        - % qtyA from reserveA:  1.1726634935486568
        - ((qtyA-fee(0.3%))*reserveB) / reserveA):  1881477988954
        - computed getAmountOut:  1859734981054
        - shift %:  1.1691455030693305
        - client TON gramm balance before: 21840159601
        - swapA status: true
        - swap speed ms: 10735
        - rate B / A after: :  0.36874209090981647
        - client TON gramm balance after: 21639674604
        - swapB operation cost: 0.200484997
        - client balanceB changed, computed getAmountOut 1859734981054,1859734981054

      SwapA test
        - the array to be checked:  1859734981054,1859734981054
        ✔ should check equal client balanceB changed and computed getAmountOut

      1 passing (12ms)
`
## `npm run test:swapB`
* on line 1 set quantity B nanoTokens for swap `const qtyB = 3000000000000;`
* at the end of the test:
`   - DEX root address:  0:80b247a393f0b94007cf7d7f97a916924739334294950088548f70cb7f2a0369
    - current dexclient address:  0:8ca8a693957ec10611289da900050a6770391c13d8920879a169453fff3ace14
    - current dexpair address:  0:81bbfb35a41dddcbe467b18ab8344ca89cecb559df75b51889c26adde0a101cd
    - rate A / B before:  2.71192257312597
    - swapB qty:3000000000000
    - % qtyB from reserveB:  1.885987275033922
    - ((qtyB-fee(0.3%))*reserveB) / reserveA):  8111360416220
    - computed getAmountOut:  7961655081898
    - shift %:  1.8803293132150003
    - client TON gramm balance before: 21639674604
    - swapB status: true
    - swap speed ms: 11010
    - rate A / B after: :  2.6125973849883257
    - client TON gramm balance after: 21439470051
    - swapB operation cost: 0.200204553
    - client balanceA changed, computed getAmountOut 7961655081898,7961655081898

  SwapB test
    - the array to be checked:  7961655081898,7961655081898
    ✔ should check equal client balanceA changed and computed getAmountOut

  1 passing (11ms)
`

* `npm run test:provide`
* `npm run test:return`

# Smartcontracts and js scripts for deploy DefiSpace DEX (stage2)

## tvm_linker commands for make TVMcell ready code  of smartcontracts for DEXRoot
* `<your path to>`/tvm_linker decode --tvc DEXConnector.tvc | grep code: | cut -c 8- > DEXConnector.txt
* `<your path to>`/tvm_linker decode --tvc DEXClient.tvc | grep code: | cut -c 8- > DEXClient.txt
* `<your path to>`/tvm_linker decode --tvc DEXPair.tvc | grep code: | cut -c 8- > DEXPair.txt
* `<your path to>`/tvm_linker decode --tvc RootTokenContract.tvc | grep code: | cut -c 8- > RootTokenContract.txt
* `<your path to>`/tvm_linker decode --tvc TONTokenWallet.tvc | grep code: | cut -c 8- > TONTokenWallet.txt

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
DEX Client step1 connect to `DEX Pair 0 WTON-USDT`, first script compute connectorSoArg0, connectorSoArg01, connectorSoArg2 and then deploy 3 wallets that need for work with `DEX Pair 0 WTON-USDT`

## node dc-dp0-mint
this script mint 2_000_000_000_000_000_000 nano `WTONs` and 1_000_000_000_000_000_000 nano `USDT` to DEX Client wallets for testing purpose

## node dc-dp0-provide
this script provide liquidity 2_000_000_000_000_000_000 nano `WTONs` and 1_000_000_000_000_000_000 nano `USDT` from DEX Client wallets to DEX Pair 0 and it mint LP tokens to DEX Client as proof of provide liquidity

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
