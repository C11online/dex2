# DEX-core-smart-contracts

## tests for  DEX-core-smart-contracts

### `cd ~/dex2/DEX-core-smart-contracts/tests-dex-ntd`
### `npm install`
### `npm run test:swapA`
   * line 1 set quantity A nanoTokens for swap `const qtyA = 5000000000000;`
   * at the end of the test:
        - DEX root address:  0:80b247a393f0b94007cf7d7f97a916924739334294950088548f70cb7f2a0369
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
        - `SwapA test`
        - the array to be checked:  1859734981054,1859734981054
        ✔ should check equal client balanceB changed and computed getAmountOut

### `npm run test:swapB`
* line 1 set quantity B nanoTokens for swap `const qtyB = 3000000000000;`
* at the end of the test:
    - DEX root address:  0:80b247a393f0b94007cf7d7f97a916924739334294950088548f70cb7f2a0369
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
    - `SwapB test`
    - the array to be checked:  7961655081898,7961655081898
    ✔ should check equal client balanceA changed and computed getAmountOut

### `npm run test:provide`
* line 1 set quantity A nanoTokens for provide liquidity `const qtyA = 100000000000;`
* line 2 set quantity B nanoTokens for provide liquidity `const qtyB = 30000000000;`
* at the end of the test:
    - reserveA before:  423593122877185
    - reserveB before:  162127217826976
    - totalSupply before:  161067491788218
    - ask to provide qtyA:100000000000
    - ask to provide qtyB:30000000000
    - should be provide qtyA:78381618192
    - should be provide qtyB:30000000000
    - should get LP tokens:  29803908426
    - client TON gramm balance before: 21439470051
    - provide status: true
    - provide speed ms: 10444
    - totalSupply after:  161097295696644
    - totalSupply changed:  29803908426
    - client income qty LP token to balanceAB:  29803908426
    - provided qtyA:78381618192
    - provided qtyB:30000000000
    - client TON gramm balance after: 20977012496
    - provideLiquidity operation cost: 0.462457555
    - client balanceA changed, pair balanceA changed:  78381618192 78381618192
    - client balanceB changed, pair balanceB changed:  30000000000 30000000000
    - client balanceAB changed, expected qty LP tokens:  29803908426 29803908426
    - `Provide test`
    - the array to be checked:  78381618192 78381618192
    ✔ should check equal client balanceA changed, pair balanceA changed
    - the array to be checked:  30000000000 30000000000
    ✔ should check equal client balanceB changed, pair balanceB changed
    - the array to be checked:  29803908426 29803908426
    ✔ should check equal client balanceAB changed, expected qty LP tokens

### `npm run test:return`
* line 1 set quantity burning AB nanoTokens for return liquidity `let qtyAB = 30000000000`
* at the end of the test:
   - reserveA before:  423827752028432
   - reserveB before:  162217020445240
   - totalSupply before:  161156707421922
   - ask to return qtyAB:30000000000
   - balance AB:123812920993
   - expected returning qtyAB:30000000000
   - expected receiving qtyA:78897321521
   - expected receiving qtyB:30197381736
   - client TON gramm balance before: 19304657399
   - return status: true
   - return speed ms: 12996
   - totalSupply after:  161126707421922
   - totalSupply changed:  30000000000
   - client outgoing qty LP token from balanceAB:  30000000000
   - client get qtyA:78897321521
   - client get qtyB:30197381736
   - client TON gramm balance after: 19024450530
   - returnLiquidity operation cost: 0.280206869
   - client balanceA changed, pair balanceA changed:  78897321521 78897321521
   - client balanceB changed, pair balanceB changed:  30197381736 30197381736
   - client balanceAB changed, expected returning qty LP tokens:  30000000000 30000000000
   - `Return test`
   - the array to be checked:  78897321521 78897321521
   ✔ should check equal client balanceA changed, pair balanceA changed
   - the array to be checked:  30197381736 30197381736
   ✔ should check equal client balanceB changed, pair balanceB changed
   - the array to be checked:  30000000000 30000000000
   ✔ should check equal client balanceAB changed, expected returning LP tokens
   - the array to be checked:  78897321521 78897321521
   ✔ should check equal client balanceA changed, expected receiving qtyA
   - the array to be checked:  30197381736 30197381736
   ✔ should check equal client balanceB changed, expected receiving qtyB

## Smartcontracts and js scripts for deploy DefiSpace DEX (stage2)

### tvm_linker commands for make TVMcell ready code  of smartcontracts for DEXRoot
* `<your path to>`/tvm_linker decode --tvc DEXConnector.tvc | grep code: | cut -c 8- > DEXConnector.txt
* `<your path to>`/tvm_linker decode --tvc DEXClient.tvc | grep code: | cut -c 8- > DEXClient.txt
* `<your path to>`/tvm_linker decode --tvc DEXPair.tvc | grep code: | cut -c 8- > DEXPair.txt
* `<your path to>`/tvm_linker decode --tvc RootTokenContract.tvc | grep code: | cut -c 8- > RootTokenContract.txt
* `<your path to>`/tvm_linker decode --tvc TONTokenWallet.tvc | grep code: | cut -c 8- > TONTokenWallet.txt

Copy and paste this into `DEXRootCode.js`

### npm install
install dependencies

### node deployWTON
address and keys will written to `WTONdata.json`

### node deployUSDT
address and keys will written to `USDTdata.json`

### node deployUSDC
address and keys will written to `USDCdata.json`

### node deployBTC
address and keys will written to `BTCdata.json`

### node deployETH
address and keys will written to `ETHdata.json`

### node root-deploy
address and keys for DEX Root will written to `DEXRootContract.json`

### node dc-predeploy
address, keys and sharding optimization argument(ClientSoArg) for DEX Client will written to `DEXClientContract.json`

### node giver-deploy
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

info:    Forever stopped process:
    uid  command       script                       forever pid     id logfile                 uptime       
[0] xT-- /usr/bin/node dcLT-dp0-swaptest-client0.js 2491318 2552777    /root/.forever/xT--.log 0:0:0:49.543
root@frhb52973ds:~/dex2/DEX-core-smart-contracts/tests-dex-ntd# forever stop dcLT-dp0-swaptest-client1.js
info:    Forever stopped process:
    uid  command       script                       forever pid     id logfile                 uptime       
[0] 76ny /usr/bin/node dcLT-dp0-swaptest-client1.js 2491928 2553009    /root/.forever/76ny.log 0:0:0:28.209
root@frhb52973ds:~/dex2/DEX-core-smart-contracts/tests-dex-ntd# forever stop dcLT-dp0-swaptest-client2.js
info:    Forever stopped process:
    uid  command       script                       forever pid     id logfile                 uptime       
[0] YAH3 /usr/bin/node dcLT-dp0-swaptest-client2.js 2491981 2553173    /root/.forever/YAH3.log 0:0:0:21.969
root@frhb52973ds:~/dex2/DEX-core-smart-contracts/tests-dex-ntd# forever stop dcLT-dp0-swaptest-client3.js
info:    Forever stopped process:
    uid  command       script                       forever pid     id logfile                 uptime       
[0] Sj9X /usr/bin/node dcLT-dp0-swaptest-client3.js 2492031 2553081    /root/.forever/Sj9X.log 0:0:0:30.359
root@frhb52973ds:~/dex2/DEX-core-smart-contracts/tests-dex-ntd# forever stop dcLT-dp0-swaptest-client4.js
info:    Forever stopped process:
    uid  command       script                       forever pid     id logfile                 uptime       
[0] H7zz /usr/bin/node dcLT-dp0-swaptest-client4.js 2492159 2553075    /root/.forever/H7zz.log 0:0:0:34.615
root@frhb52973ds:~/dex2/DEX-core-smart-contracts/tests-dex-ntd# forever stop dcLT-dp0-swaptest-client5.js
info:    Forever stopped process:
    uid  command       script                       forever pid     id logfile                 uptime      
[0] MFfx /usr/bin/node dcLT-dp0-swaptest-client5.js 2492263 2553457    /root/.forever/MFfx.log 0:0:0:3.731
root@frhb52973ds:~/dex2/DEX-core-smart-contracts/tests-dex-ntd# forever stop dcLT-dp0-swaptest-client6.js
info:    Forever stopped process:
    uid  command       script                       forever pid     id logfile                 uptime       
[0] Clfx /usr/bin/node dcLT-dp0-swaptest-client6.js 2492313 2553241    /root/.forever/Clfx.log 0:0:0:29.461
root@frhb52973ds:~/dex2/DEX-core-smart-contracts/tests-dex-ntd# forever stop dcLT-dp0-swaptest-client7.js
info:    Forever stopped process:
    uid  command       script                       forever pid     id logfile                 uptime       
[0] xRfx /usr/bin/node dcLT-dp0-swaptest-client7.js 2492379 2553016    /root/.forever/xRfx.log 0:0:0:56.115
root@frhb52973ds:~/dex2/DEX-core-smart-contracts/tests-dex-ntd# forever stop dcLT-dp0-swaptest-client8.js
info:    Forever stopped process:
    uid  command       script                       forever pid     id logfile                 uptime       
[0] er1Y /usr/bin/node dcLT-dp0-swaptest-client8.js 2492429 2553204    /root/.forever/er1Y.log 0:0:0:48.612
root@frhb52973ds:~/dex2/DEX-core-smart-contracts/tests-dex-ntd# forever stop dcLT-dp0-swaptest-client9.js
info:    Forever stopped process:
    uid  command       script                       forever pid     id logfile                 uptime      
[0] Slf0 /usr/bin/node dcLT-dp0-swaptest-client9.js 2492500 2553557    /root/.forever/Slf0.log 0:0:0:3.917
