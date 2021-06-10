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
const pathJsonClient = './DEXClientContract.json';

// const pathJsonPairTonUsdt = './DEXPairContractTonUsdt.json';
const pathJsonPairTonUsdc = './DEXPairContractTonUsdc.json';
// const pathJsonPairTonBtc = './DEXPairContractTonBtc.json';
// const pathJsonPairTonEth = './DEXPairContractTonEth.json';
// const pathJsonPairBtcUsdt = './DEXPairContractBtcUsdt.json';
// const pathJsonPairEthUsdt = './DEXPairContractEthUsdt.json';
// const pathJsonPairUsdcUsdt = './DEXPairContractUsdcUsdt.json';

const pathJsonWTON = './WTONdata.json';
// const pathJsonUSDT = './USDTdata.json';
const pathJsonUSDC = './USDCdata.json';
// const pathJsonBTC = './BTCdata.json';
// const pathJsonETH = './ETHdata.json';



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

  console.log(clientKeys);
  console.log(clientAddr);

  const pairAddr = JSON.parse(fs.readFileSync(pathJsonPairTonUsdс,{encoding: "utf8"})).address;

  console.log(pairAddr);

  responce = await clientAcc.run("processSwapB", {pairAddr:pairAddr,qtyB:498499751});
  console.log("Contract reacted to your processSwapA:", responce.decoded.output);

  // response = await clientAcc.runLocal("pairKeys", {});
  // console.log("Contract reacted to your pairKeys:", response.decoded.output);



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
