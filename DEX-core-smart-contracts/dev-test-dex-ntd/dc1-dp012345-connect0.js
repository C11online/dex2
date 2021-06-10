const {TonClient, abiContract, signerKeys} = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");
const { DEXClientContract } = require("./DEXClient.js");
const dotenv = require('dotenv').config();
const networks = ["http://localhost",'net.ton.dev','main.ton.dev','rustnet.ton.dev'];
const hello = ["Hello localhost TON!","Hello dev net TON!","Hello main net TON!","Hello rust dev net TON!"];
const networkSelector = process.env.NET_SELECTOR;

const fs = require('fs');
const pathJsonRoot = './DEXRootContract.json';
const pathJsonClient = './DEXClientContract1.json';

const pathJsonPairTonUsdt = './DEXPairContractTonUsdt.json';
const pathJsonPairTonUsdc = './DEXPairContractTonUsdc.json';
const pathJsonPairBtcUsdt = './DEXPairContractBtcUsdt.json';
const pathJsonPairEthUsdt = './DEXPairContractEthUsdt.json';
const pathJsonPairBtcUsdc = './DEXPairContractBtcUsdc.json';
const pathJsonPairEthUsdc = './DEXPairContractEthUsdc.json';

// const pathJsonPairTonBtc = './DEXPairContractTonBtc.json';
// const pathJsonPairTonEth = './DEXPairContractTonEth.json';
// const pathJsonPairUsdcUsdt = './DEXPairContractUsdcUsdt.json';

const pathJsonWTON = './WTONdata.json';
const pathJsonUSDT = './USDTdata.json';
const pathJsonUSDC = './USDCdata.json';
const pathJsonBTC = './BTCdata.json';
const pathJsonETH = './ETHdata.json';

const currentPair = pathJsonPairTonUsdc;



TonClient.useBinaryLibrary(libNode);


async function logEvents(params, response_type) {
  // console.log(`params = ${JSON.stringify(params, null, 2)}`);
  // console.log(`response_type = ${JSON.stringify(response_type, null, 2)}`);
}

async function main(client) {
  let responce;
  const clientKeys = JSON.parse(fs.readFileSync(pathJsonClient,{encoding: "utf8"})).keys;
  const clientAddr = JSON.parse(fs.readFileSync(pathJsonClient,{encoding: "utf8"})).address;
  const clientAcc = new Account(DEXClientContract, {address:clientAddr,signer:clientKeys,client,});

  console.log('clientAddr: ',clientAddr);

  const pairAddr0 = JSON.parse(fs.readFileSync(pathJsonPairTonUsdt,{encoding: "utf8"})).address;
  const pairAddr1 = JSON.parse(fs.readFileSync(pathJsonPairTonUsdc,{encoding: "utf8"})).address;
  const pairAddr2 = JSON.parse(fs.readFileSync(pathJsonPairBtcUsdt,{encoding: "utf8"})).address;
  const pairAddr3 = JSON.parse(fs.readFileSync(pathJsonPairEthUsdt,{encoding: "utf8"})).address;
  const pairAddr4 = JSON.parse(fs.readFileSync(pathJsonPairBtcUsdc,{encoding: "utf8"})).address;
  const pairAddr5 = JSON.parse(fs.readFileSync(pathJsonPairEthUsdc,{encoding: "utf8"})).address;


  responce = await clientAcc.run("connectPair", {pairAddr:pairAddr0});
  console.log("Contract reacted to your connectPair:", responce.decoded.output);

  responce = await clientAcc.run("connectPair", {pairAddr:pairAddr1});
  console.log("Contract reacted to your connectPair:", responce.decoded.output);

  responce = await clientAcc.run("connectPair", {pairAddr:pairAddr2});
  console.log("Contract reacted to your connectPair:", responce.decoded.output);

  responce = await clientAcc.run("connectPair", {pairAddr:pairAddr3});
  console.log("Contract reacted to your connectPair:", responce.decoded.output);

  responce = await clientAcc.run("connectPair", {pairAddr:pairAddr4});
  console.log("Contract reacted to your connectPair:", responce.decoded.output);

  responce = await clientAcc.run("connectPair", {pairAddr:pairAddr5});
  console.log("Contract reacted to your connectPair:", responce.decoded.output);


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
