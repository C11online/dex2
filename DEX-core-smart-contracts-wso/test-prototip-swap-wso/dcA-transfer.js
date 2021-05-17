const {TonClient, abiContract, signerKeys} = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");
const dotenv = require('dotenv').config();
const { DEXClientContract } = require("./DEXClient.js");
const { DEXConnectorContract } = require("./DEXConnector.js");
const { RootTokenContract } = require("./RootTokenContract.js");
const { TONTokenWalletContract } = require("./TONTokenWallet.js");
const { GiverContract } = require("./Giver.js");
const networks = ["http://localhost",'net.ton.dev','main.ton.dev','rustnet.ton.dev'];
const hello = ["Hello localhost TON!","Hello dev net TON!","Hello main net TON!","Hello rust dev net TON!"];
const networkSelector = process.env.NET_SELECTOR;

const fs = require('fs');
const pathJson = './DEXClientA.json';
const pathJsonB = './DEXClientB.json';
const path = './DEXConnectorA.json';
const pathJsonR = './USDCdata.json';
const pathJsonR1 = './USDTdata.json';


TonClient.useBinaryLibrary(libNode);

function getShard(string) {
  return string[2];
}


async function logEvents(params, response_type) {
  // console.log(`params = ${JSON.stringify(params, null, 2)}`);
  // console.log(`response_type = ${JSON.stringify(response_type, null, 2)}`);
}

async function main(client) {
  let response;
  const rootAddr = JSON.parse(fs.readFileSync(pathJsonR,{encoding: "utf8"})).address;
  const rootAddr1 = JSON.parse(fs.readFileSync(pathJsonR1,{encoding: "utf8"})).address;

  const connectorAddr = JSON.parse(fs.readFileSync(path,{encoding: "utf8"})).address;

  const clientKeys = JSON.parse(fs.readFileSync(pathJson,{encoding: "utf8"})).keys;
  const clientAddrA = JSON.parse(fs.readFileSync(pathJson,{encoding: "utf8"})).address;
  const clientAccA = new Account(DEXClientContract, {
    address: clientAddrA,
    signer: clientKeys,
    client,
  });

  // Execute `roots` get method  (execute the message locally on TVM)
  response = await clientAccA.runLocal("roots", {});
  console.log("Contract dcA reacted to your roots:", response.decoded.output.roots);
  let walletsA = response.decoded.output.roots;
  let walletAddrA = walletsA[rootAddr];
  const walletAccA = new Account(TONTokenWalletContract, {
    address: walletAddrA,
    client,
  });




  const clientAddrB = JSON.parse(fs.readFileSync(pathJsonB,{encoding: "utf8"})).address;
  const clientAccB = new Account(DEXClientContract, {
    address: clientAddrB,
    client,
  });

// Execute `roots` get method  (execute the message locally on TVM)
response = await clientAccB.runLocal("roots", {});
console.log("Contract dcB reacted to your roots:", response.decoded.output.roots);
let walletsB = response.decoded.output.roots;
let walletAddrB = walletsB[rootAddr];
const walletAccB = new Account(TONTokenWalletContract, {
  address: walletAddrB,
  client,
});


// Call `transfer` function
response = await clientAccA.run("transferAB", {rootA:rootAddr, rootB:rootAddr1, to:walletAddrB, tokens:500000000, grams:1000000000});
console.log(`Contract run transfer with tx ${response.decoded.output}, ${response.transaction.id}`);

// Execute `balance` get method  (execute the message locally on TVM)
response = await walletAccA.runLocal("balance", {_answer_id:0});
console.log("Contract walletAccA reacted to your balance:", response.decoded.output);

// Execute `balance` get method  (execute the message locally on TVM)
response = await walletAccB.runLocal("balance", {_answer_id:0});
console.log("Contract walletAccB reacted to your balance:", response.decoded.output);


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
