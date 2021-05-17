const {TonClient, abiContract, signerKeys} = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");
const dotenv = require('dotenv').config();
const { DEXClientContract } = require("./DEXClient.js");
const { DEXConnectorContract } = require("./DEXConnector.js");
const { RootTokenContract } = require("./RootTokenContract.js");
const { GiverContract } = require("./Giver.js");
const networks = ["http://localhost",'net.ton.dev','main.ton.dev','rustnet.ton.dev'];
const hello = ["Hello localhost TON!","Hello dev net TON!","Hello main net TON!","Hello rust dev net TON!"];
const networkSelector = process.env.NET_SELECTOR;

const fs = require('fs');
const pathJson = './DEXClientA.json';
const path = './DEXConnectorA1.json';
const pathJsonR = './USDTdata.json';



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
  const rootAbi = {type:'Contract',value:DEXClientContract.abi};

  const clientKeys = JSON.parse(fs.readFileSync(pathJson,{encoding: "utf8"})).keys;
  const clientAddr = JSON.parse(fs.readFileSync(pathJson,{encoding: "utf8"})).address;

  const clientAcc = new Account(DEXClientContract, {
    address: clientAddr,
    signer: clientKeys,
    client,
  });

  const rootAddr = JSON.parse(fs.readFileSync(pathJsonR,{encoding: "utf8"})).address;
  const rootAcc = new Account(RootTokenContract, {
    address: rootAddr,
    client,
  });




// Call `touch` function
// let response = await wrapperAcc.run("createZeroWallet", {});
// console.log(`Contract run createZeroWallet with output ${response.decoded.output}, ${response.transaction.id}`);

let status = false;
let targetShard = getShard(clientAddr);
let n = 0;
while (!status) {
  response = await clientAcc.runLocal("getConnectorAddress", {_answer_id:0, connectorSoArg:n});
  let connectorAddr = response.decoded.output.value0;
  let shardC = getShard(connectorAddr);
  if (shardC == targetShard) {
    console.log("connectorSoArg:", n);
    console.log("getConnectorAddress:", connectorAddr);
    response = await rootAcc.runLocal("getWalletAddress", {_answer_id:0, wallet_public_key_:0,owner_address_:connectorAddr});
    let walletAddr = response.decoded.output.value0;
    let shardW = getShard(walletAddr);
    if (shardW == targetShard) {
      console.log("Bingo!");
      let keyJson = JSON.stringify({address:connectorAddr, connectorSoArg:n});
      fs.writeFileSync( path, keyJson,{flag:'w'});
      console.log("getWalletAddress:", walletAddr);
      console.log("Address of the connector and connectorSoArg written successfully to:", path);
      status = true;
    } else {console.log(n);}
  } else {console.log(n);}
  n++;
}


// // Execute `getConnectorAddress` get method  (execute the message locally on TVM)
// response = await clientAcc.runLocal("getConnectorAddress", {_answer_id:0, connectorSoArg:0});
// console.log("Contract reacted to your getConnectorAddress:", response.decoded.output);
// let connector = response.decoded.output.value0;
//
// // Execute `getWalletAddress` get method  (execute the message locally on TVM)
// response = await rootAcc.runLocal("getWalletAddress", {_answer_id:0, wallet_public_key_:0,owner_address_:connector});
// console.log("Contract reacted to your getWalletAddress:", response.decoded.output);



// // Execute `roots` get method  (execute the message locally on TVM)
// response = await clientAcc.runLocal("roots", {});
// console.log("Contract reacted to your roots:", response.decoded.output);
//
// // Execute `connectors` get method  (execute the message locally on TVM)
// response = await clientAcc.runLocal("connectors", {});
// console.log("Contract reacted to your connectors:", response.decoded.output);
//
// // Execute `counterCallback` get method  (execute the message locally on TVM)
// response = await clientAcc.runLocal("counterCallback", {});
// console.log("Contract reacted to your counterCallback:", response.decoded.output);

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
