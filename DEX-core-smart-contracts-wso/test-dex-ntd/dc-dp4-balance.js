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

const fs = require('fs');
const pathJsonRoot = './DEXRootContract.json';
const pathJsonClient = './DEXClientContract.json';

const pathJsonPairTonUsdt = './DEXPairContractTonUsdt.json';
const pathJsonPairTonUsdc = './DEXPairContractTonUsdc.json';
const pathJsonPairTonBtc = './DEXPairContractTonBtc.json';
const pathJsonPairTonEth = './DEXPairContractTonEth.json';
const pathJsonPairBtcUsdt = './DEXPairContractBtcUsdt.json';
const pathJsonPairEthUsdt = './DEXPairContractEthUsdt.json';
const pathJsonPairBtcUsdc = './DEXPairContractBtcUsdc.json';
const pathJsonPairEthUsdc = './DEXPairContractEthUsdc.json';
const pathJsonPairUsdcUsdt = './DEXPairContractUsdcUsdt.json';

const pathJsonWTON = './WTONdata.json';
const pathJsonUSDT = './USDTdata.json';
const pathJsonUSDC = './USDCdata.json';
const pathJsonBTC = './BTCdata.json';
const pathJsonETH = './ETHdata.json';

const pathRootA = pathJsonBTC;
const pathRootB = pathJsonUSDC;
const pathPair = pathJsonPairBtcUsdc;


TonClient.useBinaryLibrary(libNode);


async function logEvents(params, response_type) {
  // console.log(`params = ${JSON.stringify(params, null, 2)}`);
  // console.log(`response_type = ${JSON.stringify(response_type, null, 2)}`);
}

async function main(client) {
  let responce;


  const rootKeysA = JSON.parse(fs.readFileSync(pathRootA,{encoding: "utf8"})).keys;
  const rootAddrA = JSON.parse(fs.readFileSync(pathRootA,{encoding: "utf8"})).address;
  const rootAccA = new Account(RootTokenContract, {address: rootAddrA,signer: rootKeysA,client,});
  console.log("WTON root:", rootAddrA);


  const rootKeysB = JSON.parse(fs.readFileSync(pathRootB,{encoding: "utf8"})).keys;
  const rootAddrB = JSON.parse(fs.readFileSync(pathRootB,{encoding: "utf8"})).address;
  const rootAccB = new Account(RootTokenContract, {address: rootAddrB,signer: rootKeysB,client,});
  console.log("USDС root:", rootAddrB);


  const clientKeys = JSON.parse(fs.readFileSync(pathJsonClient,{encoding: "utf8"})).keys;
  const clientAddr = JSON.parse(fs.readFileSync(pathJsonClient,{encoding: "utf8"})).address;
  const clientAcc = new Account(DEXClientContract, {address:clientAddr,signer:clientKeys,client,});


  const pairAddr = JSON.parse(fs.readFileSync(pathPair,{encoding: "utf8"})).address;


  response = await clientAcc.runLocal("rootWallet", {});
  console.log("Contract reacted to your rootWallet:", response.decoded.output);

  let walletRootA = response.decoded.output.rootWallet[rootAddrA];
  console.log("Contract reacted to your walletRootA:", walletRootA);
  const walletAccA = new Account(TONTokenWalletContract, {address: walletRootA,client,});

  let walletRootB = response.decoded.output.rootWallet[rootAddrB];
  console.log("Contract reacted to your walletRootB:", walletRootB);
  const walletAccB = new Account(TONTokenWalletContract, {address: walletRootB,client,});

  response = await walletAccA.runLocal("balance", {_answer_id:0});
  console.log("walletAccA reacted to your balance:", response.decoded.output);

  response = await walletAccB.runLocal("balance", {_answer_id:0});
  console.log("walletAccB reacted to your balance:", response.decoded.output);


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
