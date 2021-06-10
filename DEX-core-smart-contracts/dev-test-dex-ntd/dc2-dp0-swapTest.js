const {TonClient, abiContract, signerKeys} = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");
const { DEXClientContract } = require("./DEXClient.js");
const { DEXPairContract } = require("./DEXPair.js");
const { RootTokenContract } = require("./RootTokenContract.js");
const { TONTokenWalletContract } = require("./TONTokenWallet.js");

const dotenv = require('dotenv').config();
const networks = ["http://localhost",'net.ton.dev','main.ton.dev','rustnet.ton.dev'];
const hello = ["Hello localhost TON!","Hello dev net TON!","Hello main net TON!","Hello rust dev net TON!"];
const networkSelector = process.env.NET_SELECTOR;

var assert = require('assert');
const { expect } = require('chai')
const fs = require('fs');
const pathJsonRoot = './DEXRootContract.json';
const pathJsonClient = './DEXClientContract2.json';

const pathJsonPairTonUsdt = './DEXPairContractTonUsdt.json';
const pathJsonPairTonUsdc = './DEXPairContractTonUsdc.json';
const pathJsonPairBtcUsdt = './DEXPairContractBtcUsdt.json';
const pathJsonPairEthUsdt = './DEXPairContractEthUsdt.json';
const pathJsonPairBtcUsdc = './DEXPairContractBtcUsdc.json';
const pathJsonPairEthUsdc = './DEXPairContractEthUsdc.json';
const pathJsonPairTonEth = './DEXPairContractTonEth.json';
const pathJsonPairTonBtc = './DEXPairContractTonBtc.json';
const pathJsonPairUsdcUsdt = './DEXPairContractUsdcUsdt.json';
const pathJsonPairTonDai = './DEXPairContractTonDai.json';
const pathJsonPairEthDai = './DEXPairContractEthDai.json';
const pathJsonPairBtcDai = './DEXPairContractBtcDai.json';
const pathJsonPairUsdtDai = './DEXPairContractUsdtDai.json';
const pathJsonPairUsdcDai = './DEXPairContractUsdcDai.json';
const pathJsonPairEthBtc = './DEXPairContractEthBtc.json';
const pathJsonPairBnbEth = './DEXPairContractBnbEth.json';


const pathJsonWTON = './WTONdata.json';
const pathJsonUSDT = './USDTdata.json';
const pathJsonUSDC = './USDCdata.json';
const pathJsonBTC = './BTCdata.json';
const pathJsonETH = './ETHdata.json';
const pathJsonDAI = './DAIdata.json';
const pathJsonBNB = './BNBdata.json';


let currentRootA = pathJsonWTON;
let currentRootB = pathJsonUSDT;
let currentPairPath = pathJsonPairTonUsdt;

let balanceClientA1;
let balanceClientA2;
let balanceClientB1;
let balanceClientB2;

let reserveA;
let reserveB;

TonClient.useBinaryLibrary(libNode);

// Function to get amountOut for swap from amountIn .
function getAmountOut(amountIn, rootIn, rootOut) {
  let amountInWithFee = amountIn * 997;
  let numerator = amountInWithFee * rootOut;
  let denominator = amountInWithFee + rootIn * 1000;
  return Math.round(numerator/denominator);
}


async function logEvents(params, response_type) {
  // console.log(`params = ${JSON.stringify(params, null, 2)}`);
  // console.log(`response_type = ${JSON.stringify(response_type, null, 2)}`);
}

async function main(client) {
  let responce;
  const clientKeys = JSON.parse(fs.readFileSync(pathJsonClient,{encoding: "utf8"})).keys;
  const clientAddr = JSON.parse(fs.readFileSync(pathJsonClient,{encoding: "utf8"})).address;
  const clientAcc = new Account(DEXClientContract, {address:clientAddr,signer:clientKeys,client,});

  // console.log(clientKeys);
  console.log(clientAddr);

  const pairAddr = JSON.parse(fs.readFileSync(currentPairPath,{encoding: "utf8"})).address;
  const pairAcc = new Account(DEXPairContract, {address: pairAddr, client,});


  console.log(pairAddr);

  response = await pairAcc.runLocal("rootA", {});
  let rootA = response.decoded.output.rootA;
  response = await pairAcc.runLocal("rootB", {});
  let rootB = response.decoded.output.rootB;
  response = await pairAcc.runLocal("balanceReserve", {});
  reserveA = response.decoded.output.balanceReserve[rootA];
  reserveB = response.decoded.output.balanceReserve[rootB];
  console.log("balanceReserveA: ", reserveA," / balanceReserveB: ", reserveB);

  response = await clientAcc.runLocal("rootWallet", {});
  let clientWalletA = response.decoded.output.rootWallet[rootA];
  let clientWalletB = response.decoded.output.rootWallet[rootB];
  const walletAccA = new Account(TONTokenWalletContract, {address: clientWalletA,client,});
  const walletAccB = new Account(TONTokenWalletContract, {address: clientWalletB,client,});
  response = await walletAccA.runLocal("balance", {_answer_id:0});
  balanceClientA1 = response.decoded.output.value0;
  response = await walletAccB.runLocal("balance", {_answer_id:0});
  balanceClientB1 = response.decoded.output.value0;
  console.log("balanceClientA: ", balanceClientA1," / balanceClientB: ", balanceClientB1);



  responce = await clientAcc.run("processSwapA", {pairAddr:pairAddr,qtyA:1000});
  console.log("Contract reacted to your processSwapA:", responce.decoded.output);

}


async function main2(client) {
  let responce;
  const clientKeys = JSON.parse(fs.readFileSync(pathJsonClient,{encoding: "utf8"})).keys;
  const clientAddr = JSON.parse(fs.readFileSync(pathJsonClient,{encoding: "utf8"})).address;
  const clientAcc = new Account(DEXClientContract, {address:clientAddr,signer:clientKeys,client,});
  console.log(clientAddr);
  const pairAddr = JSON.parse(fs.readFileSync(currentPairPath,{encoding: "utf8"})).address;
  const pairAcc = new Account(DEXPairContract, {address: pairAddr, client,});
  console.log(pairAddr);
  response = await pairAcc.runLocal("rootA", {});
  let rootA = response.decoded.output.rootA;
  response = await pairAcc.runLocal("rootB", {});
  let rootB = response.decoded.output.rootB;
  response = await pairAcc.runLocal("balanceReserve", {});
  let reserveA = response.decoded.output.balanceReserve[rootA];
  let reserveB = response.decoded.output.balanceReserve[rootB];
  console.log("balanceReserveA: ", reserveA," / balanceReserveB: ", reserveB);
  response = await clientAcc.runLocal("rootWallet", {});
  let clientWalletA = response.decoded.output.rootWallet[rootA];
  let clientWalletB = response.decoded.output.rootWallet[rootB];
  const walletAccA = new Account(TONTokenWalletContract, {address: clientWalletA,client,});
  const walletAccB = new Account(TONTokenWalletContract, {address: clientWalletB,client,});
  response = await walletAccA.runLocal("balance", {_answer_id:0});
  balanceClientA2 = response.decoded.output.value0;
  response = await walletAccB.runLocal("balance", {_answer_id:0});
  balanceClientB2 = response.decoded.output.value0;
  console.log("balanceClientA: ", balanceClientA2," / balanceClientB: ", balanceClientB2);

  let deltaA = balanceClientA1 - balanceClientA2;
  let deltaB = balanceClientB2 - balanceClientB1;
  console.log("deltaClientA: ", deltaA," / deltaClientB: ", deltaB);
  let checkB = getAmountOut(deltaA, reserveA, reserveB)
  console.log("deltaClientA: ", deltaA," / deltaClientB: ", checkB);
    // it('Should check that swapA is correct', function () {
    // const var0 = await this.yvWETH.emergencyShutdown();
    // expect(deltaB == checkB).to.be.true;
  // });

  describe("swap tests", function() {

  it("Should check that swapA is correct", function() {
    expect(deltaB == checkB).to.be.true;
  });

});

}


(async () => {
  const client = new TonClient({network: { endpoints: [networks[networkSelector]],},});
  try {
    console.log(hello[networkSelector]);
    await main(client);
    await main2(client);
    process.exit(0);
  } catch (error) {
    if (error.code === 504) {
      console.error(`Network is inaccessible. Pls check connection`);
    } else {
      console.error(error);
    }
  }
  client.close();
})();
