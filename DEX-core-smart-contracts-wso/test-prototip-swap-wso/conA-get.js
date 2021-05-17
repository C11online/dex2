const {TonClient, abiContract, signerKeys} = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");
const dotenv = require('dotenv').config();
const { DEXConnectorContract } = require("./DEXConnector.js");
const networks = ["http://localhost",'net.ton.dev','main.ton.dev','rustnet.ton.dev'];
const hello = ["Hello localhost TON!","Hello dev net TON!","Hello main net TON!","Hello rust dev net TON!"];
const networkSelector = process.env.NET_SELECTOR;

const fs = require('fs');
const path = './DEXConnectorA.json';



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

  const connectorAddr = JSON.parse(fs.readFileSync(path,{encoding: "utf8"})).address;
  const connectorAcc = new Account(DEXConnectorContract, {
    address: connectorAddr,
    client,
  });


// Call `connectRoot` function
// response = await clientAcc.run("connectRoot", {root:rootAddr, souint:connectorSoArg});
// console.log(`Contract run connectRoot with output ${response.decoded.output}, ${response.transaction.id}`);



// // Execute `getConnectorAddress` get method  (execute the message locally on TVM)
// response = await clientAcc.runLocal("getConnectorAddress", {_answer_id:0, connectorSoArg:0});
// console.log("Contract reacted to your getConnectorAddress:", response.decoded.output);
// let connector = response.decoded.output.value0;
//
// // Execute `getWalletAddress` get method  (execute the message locally on TVM)
// response = await rootAcc.runLocal("getWalletAddress", {_answer_id:0, wallet_public_key_:0,owner_address_:connector});
// console.log("Contract reacted to your getWalletAddress:", response.decoded.output);

console.log("Contract dexconnector: ", connectorAddr);

response = await connectorAcc.runLocal("dexclient", {});
console.log("Contract reacted to your dexclient:", response.decoded.output);

response = await connectorAcc.runLocal("statusConnected", {});
console.log("Contract reacted to your statusConnected:", response.decoded.output);

response = await connectorAcc.runLocal("driven", {});
console.log("Contract reacted to your driven:", response.decoded.output);

response = await connectorAcc.runLocal("drivenRoot", {});
console.log("Contract reacted to your drivenRoot:", response.decoded.output);

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
