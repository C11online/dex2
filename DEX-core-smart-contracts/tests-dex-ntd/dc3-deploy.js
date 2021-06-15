const {TonClient, abiContract, signerKeys} = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");
const { DEXRootContract } = require("./DEXRoot.js");
const { DEXClientContract } = require("./DEXClient.js");
const { DEXConnectorContract } = require("./DEXConnector.js");
const { GiverContract } = require("./Giver.js");
const dotenv = require('dotenv').config();
const networks = ["http://localhost",'net.ton.dev','main.ton.dev','rustnet.ton.dev'];
const hello = ["Hello localhost TON!","Hello dev net TON!","Hello main net TON!","Hello rust dev net TON!"];
const networkSelector = process.env.NET_SELECTOR;

const fs = require('fs');
const pathJsonRoot = './DEXRootContract.json';
const pathJsonClient = './DEXClientContract3.json';

TonClient.useBinaryLibrary(libNode);

function getShard(string) {
  return string[2];
}

async function logEvents(params, response_type) {
  // console.log(`params = ${JSON.stringify(params, null, 2)}`);
  // console.log(`response_type = ${JSON.stringify(response_type, null, 2)}`);
}

async function main(client) {
  let responce;
  const rootAddr = JSON.parse(fs.readFileSync(pathJsonRoot,{encoding: "utf8"})).address;
  const rootAcc = new Account(DEXRootContract, {address: rootAddr,client,});

  const clientKeys = JSON.parse(fs.readFileSync(pathJsonClient,{encoding: "utf8"})).keys;
  let pubkey = '0x'+clientKeys.keys.public;

  const clientSoArg = JSON.parse(fs.readFileSync(pathJsonClient,{encoding: "utf8"})).clientSoArg;

  response = await rootAcc.run("createDEXclient", {pubkey:pubkey, souint:clientSoArg});
  console.log("Contract reacted to your createDEXclient:", response.decoded.output);


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
