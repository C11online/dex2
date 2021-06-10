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
const pathJsonClient = './DEXClientContract2.json';

const pathJsonPairTonUsdt = './DEXPairContractTonUsdt.json';


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



  response = await clientAcc.runLocal("rootDEX", {});
  console.log("Contract reacted to your rootDEX:", response.decoded.output);

  response = await clientAcc.runLocal("soUINT", {});
  console.log("Contract reacted to your soUINT:", response.decoded.output);

  response = await clientAcc.runLocal("getAllDataPreparation", {});
  console.log("Contract reacted to your getAllDataPreparation:", response.decoded.output);

  response = await clientAcc.runLocal("pairs", {});
  console.log("Contract reacted to your pairs:", response.decoded.output);

  response = await clientAcc.runLocal("rootWallet", {});
  console.log("Contract reacted to your rootWallet:", response.decoded.output);

  response = await clientAcc.runLocal("rootConnector", {});
  console.log("Contract reacted to your rootConnector:", response.decoded.output);

  response = await clientAcc.runLocal("counterCallback", {});
  console.log("Contract reacted to your counterCallback:", response.decoded.output);

  response = await clientAcc.runLocal("getBalance", {});
  console.log("Contract reacted to your getBalance:", response.decoded.output);


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
