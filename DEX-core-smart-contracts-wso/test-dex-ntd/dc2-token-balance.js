const {TonClient, abiContract, signerKeys} = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");
const { DEXClientContract } = require("./DEXClient.js");
const { RootTokenContract } = require("./RootTokenContract.js");
const { TONTokenWalletContract } = require("./TONTokenWallet.js");
const dotenv = require('dotenv').config();
const networks = ["http://localhost",'net.ton.dev','main.ton.dev','rustnet.ton.dev'];
const hello = ["Hello localhost TON!","Hello dev net TON!","Hello main net TON!","Hello rust dev net TON!"];
const networkSelector = process.env.NET_SELECTOR;

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

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


function convert(number, decimal) {
  return Math.trunc(number)*(10**decimal) + Math.floor((number - Math.trunc(number))*(10**decimal));
}

TonClient.useBinaryLibrary(libNode);

async function logEvents(params, response_type) {
  // console.log(`params = ${JSON.stringify(params, null, 2)}`);
  // console.log(`response_type = ${JSON.stringify(response_type, null, 2)}`);
}

async function main(client) {
  let responce;

  const rootKeysA = JSON.parse(fs.readFileSync(pathJsonUSDT,{encoding: "utf8"})).keys;
  const rootAddrA = JSON.parse(fs.readFileSync(pathJsonUSDT,{encoding: "utf8"})).address;
  const rootAccA = new Account(RootTokenContract, {address: rootAddrA,signer: rootKeysA,client,});
  console.log("USDT root:", rootAddrA);


  // const rootKeysB = JSON.parse(fs.readFileSync(pathJsonUSDC,{encoding: "utf8"})).keys;
  // const rootAddrB = JSON.parse(fs.readFileSync(pathJsonUSDC,{encoding: "utf8"})).address;
  // const rootAccB = new Account(RootTokenContract, {address: rootAddrB,signer: rootKeysB,client,});
  // console.log("USDC root:", rootAddrB);
  //
  const rootKeysC = JSON.parse(fs.readFileSync(pathJsonBTC,{encoding: "utf8"})).keys;
  const rootAddrC = JSON.parse(fs.readFileSync(pathJsonBTC,{encoding: "utf8"})).address;
  const rootAccC = new Account(RootTokenContract, {address: rootAddrC,signer: rootKeysC,client,});
  console.log("BTC root:", rootAddrC);

  const rootKeysD = JSON.parse(fs.readFileSync(pathJsonETH,{encoding: "utf8"})).keys;
  const rootAddrD = JSON.parse(fs.readFileSync(pathJsonETH,{encoding: "utf8"})).address;
  const rootAccD = new Account(RootTokenContract, {address: rootAddrD,signer: rootKeysD,client,});
  console.log("ETH root:", rootAddrD);

  const rootKeysE = JSON.parse(fs.readFileSync(pathJsonWTON,{encoding: "utf8"})).keys;
  const rootAddrE = JSON.parse(fs.readFileSync(pathJsonWTON,{encoding: "utf8"})).address;
  const rootAccE = new Account(RootTokenContract, {address: rootAddrE,signer: rootKeysE,client,});
  console.log("WTON root:", rootAddrE);

  // const rootKeysF = JSON.parse(fs.readFileSync(pathJsonDAI,{encoding: "utf8"})).keys;
  // const rootAddrF = JSON.parse(fs.readFileSync(pathJsonDAI,{encoding: "utf8"})).address;
  // const rootAccF = new Account(RootTokenContract, {address: rootAddrF,signer: rootKeysF,client,});
  // console.log("DAI root:", rootAddrE);

  // const rootKeysG = JSON.parse(fs.readFileSync(pathJsonBNB,{encoding: "utf8"})).keys;
  // const rootAddrG = JSON.parse(fs.readFileSync(pathJsonBNB,{encoding: "utf8"})).address;
  // const rootAccG = new Account(RootTokenContract, {address: rootAddrG,signer: rootKeysG,client,});
  // console.log("BNB root:", rootAddrG);



  const clientKeys = JSON.parse(fs.readFileSync(pathJsonClient,{encoding: "utf8"})).keys;
  const clientAddr = JSON.parse(fs.readFileSync(pathJsonClient,{encoding: "utf8"})).address;
  const clientAcc = new Account(DEXClientContract, {address:clientAddr,signer:clientKeys,client,});


  response = await clientAcc.runLocal("rootWallet", {});
  // console.log("Contract reacted to your rootWallet:", response.decoded.output);

  let walletRootA = response.decoded.output.rootWallet[rootAddrA];
  console.log("Contract reacted to your walletRootA:", walletRootA);
  const walletAccA = new Account(TONTokenWalletContract, {address: walletRootA,client,});

  // let walletRootB = response.decoded.output.rootWallet[rootAddrB];
  // console.log("Contract reacted to your walletRootB:", walletRootB);
  // const walletAccB = new Account(TONTokenWalletContract, {address: walletRootB,client,});
  //
  let walletRootC = response.decoded.output.rootWallet[rootAddrC];
  console.log("Contract reacted to your walletRootC:", walletRootC);
  const walletAccC = new Account(TONTokenWalletContract, {address: walletRootC,client,});

  let walletRootD = response.decoded.output.rootWallet[rootAddrD];
  console.log("Contract reacted to your walletRootD:", walletRootD);
  const walletAccD = new Account(TONTokenWalletContract, {address: walletRootD,client,});

  let walletRootE = response.decoded.output.rootWallet[rootAddrE];
  console.log("Contract reacted to your walletRootE:", walletRootE);
  const walletAccE = new Account(TONTokenWalletContract, {address: walletRootE,client,});

  // let walletRootF = response.decoded.output.rootWallet[rootAddrF];
  // console.log("Contract reacted to your walletRootE:", walletRootF);
  // const walletAccF = new Account(TONTokenWalletContract, {address: walletRootF,client,});

  // let walletRootG = response.decoded.output.rootWallet[rootAddrG];
  // console.log("Contract reacted to your walletRootE:", walletRootG);
  // const walletAccG = new Account(TONTokenWalletContract, {address: walletRootG,client,});




  response = await walletAccA.runLocal("balance", {_answer_id:0});
  console.log("USDT balance:", response.decoded.output);

  // response = await walletAccB.runLocal("balance", {_answer_id:0});
  // console.log("USDC balance:", response.decoded.output);
  //
  response = await walletAccC.runLocal("balance", {_answer_id:0});
  console.log("BTC balance:", response.decoded.output);

  response = await walletAccD.runLocal("balance", {_answer_id:0});
  console.log("ETH balance:", response.decoded.output);

  response = await walletAccE.runLocal("balance", {_answer_id:0});
  console.log("WTON balance:", response.decoded.output);

  // response = await walletAccF.runLocal("balance", {_answer_id:0});
  // console.log("DAI balance:", response.decoded.output);

  // response = await walletAccG.runLocal("balance", {_answer_id:0});
  // console.log("BNB balance:", response.decoded.output);


  // response = await walletAccA.runLocal("getDetails", {_answer_id:0});
  // console.log("USDT getDetails:", response.decoded.output);
  //
  // response = await walletAccE.runLocal("getDetails", {_answer_id:0});
  // console.log("WTON getDetails:", response.decoded.output);





}

(async () => {
  const client = new TonClient({network: { endpoints: [networks[networkSelector]],},});
  try {
    console.log(hello[networkSelector]);
    await main(client);
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
