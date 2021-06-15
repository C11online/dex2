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
