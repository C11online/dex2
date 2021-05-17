const {TonClient, abiContract, signerKeys} = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");
const dotenv = require('dotenv').config();
const { DEXClientContract } = require("./DEXClient.js");
const { DEXConnectorContract } = require("./DEXConnector.js");
const { GiverContract } = require("./Giver.js");
const networks = ["http://localhost",'net.ton.dev','main.ton.dev','rustnet.ton.dev'];
const hello = ["Hello localhost TON!","Hello dev net TON!","Hello main net TON!","Hello rust dev net TON!"];
const networkSelector = process.env.NET_SELECTOR;

const fs = require('fs');
const pathJson = './DEXClientA.json';

TonClient.useBinaryLibrary(libNode);

async function logEvents(params, response_type) {
  // console.log(`params = ${JSON.stringify(params, null, 2)}`);
  // console.log(`response_type = ${JSON.stringify(response_type, null, 2)}`);
}

async function main(client) {
  const rootAbi = {
    type: 'Contract',
    value: DEXClientContract.abi
  }

  const rootKeys = signerKeys(await TonClient.default.crypto.generate_random_sign_keys());
  const rootAcc = new Account(DEXClientContract, {
    signer: rootKeys,
    initData: {
      soUINT: 0,
      codeDEXConnector: DEXConnectorContract.code
    },
    client,
  });
  const rootAddr = await rootAcc.getAddress();
  console.log(`Future address of the DEXClient will be: ${rootAddr}`);

  if (networkSelector == 0) {
    const giver = await Account.getGiverForClient(client);
    await giver.sendTo(rootAddr, 100_000_000_000);
    console.log(`Grams were transferred from giver to ${rootAddr}`);
  } else if (networkSelector == 1) {
    const giverNTDAddress = JSON.parse(fs.readFileSync('./GiverContractNTD.json',{encoding: "utf8"})).address;;
    const giverNTDKeys = JSON.parse(fs.readFileSync('./GiverContractNTD.json',{encoding: "utf8"})).keys;
    const giverNTDAcc = new Account(GiverContract, {
      address: giverNTDAddress,
      signer: giverNTDKeys,
      client,
    });
    // Call `sendTransaction` function
    response = await giverNTDAcc.run("sendTransaction", {dest:rootAddr,value:20000000000,bounce:false});
    console.log("Giver send 20 ton to DEXClient:", response.decoded.output);
  } else if (networkSelector == 2){console.log('Pls set giver for main.ton.dev');
} else if (networkSelector == 3){
  const giverRTDAddress = JSON.parse(fs.readFileSync('./GiverContractRTD.json',{encoding: "utf8"})).address;;
  const giverRTDKeys = JSON.parse(fs.readFileSync('./GiverContractRTD.json',{encoding: "utf8"})).keys;
  const giverRTDAcc = new Account(GiverContract, {address: giverRTDAddress,signer: giverRTDKeys,client,});
  // Call `sendTransaction` function
  response = await giverRTDAcc.run("sendTransaction", {dest:rootAddr,value:20000000000,bounce:false});
  console.log("Giver send 20 ton to DEXClient:", response.decoded.output);
} else {console.log('networkSelector is incorrect');}


let rootJson = JSON.stringify({address:rootAddr, keys:rootKeys});
fs.writeFileSync( pathJson, rootJson,{flag:'w'});
console.log("Future address of the contract  and keys written successfully to:", pathJson);

let shard_block_id;
let deployMessage = await client.abi.encode_message(await rootAcc.getParamsOfDeployMessage({
  initFunctionName:"constructor",
  initInput:{
  },
}));
shard_block_id = (await client.processing.send_message({
  message: deployMessage.message,
  send_events: true,
}, logEvents,
)).shard_block_id;
console.log(`Deploy DEXClient message was sent.`);

// Monitor message delivery.
// See more info about `wait_for_transaction` here
// https://github.com/tonlabs/TON-SDK/blob/master/docs/mod_processing.md#wait_for_transaction
let deploy_processing_result = await client.processing.wait_for_transaction({
  abi: abiContract(rootAcc.abi),
  message: deployMessage.message,
  shard_block_id: shard_block_id,
  send_events: true,
},
logEvents,
);
console.log(`Deploy transaction: ${JSON.stringify(deploy_processing_result.transaction, null, 2)}`);
console.log(`Deploy fees: ${JSON.stringify(deploy_processing_result.fees, null, 2)}`);
console.log(`Contract was deployed at address: ${rootAddr}`);


// Call `touch` function
// let response = await wrapperAcc.run("createZeroWallet", {});
// console.log(`Contract run createZeroWallet with output ${response.decoded.output}, ${response.transaction.id}`);

// Execute `roots` get method  (execute the message locally on TVM)
response = await rootAcc.runLocal("roots", {});
console.log("Contract reacted to your roots:", response.decoded.output);

// Execute `connectors` get method  (execute the message locally on TVM)
response = await rootAcc.runLocal("connectors", {});
console.log("Contract reacted to your connectors:", response.decoded.output);

// Execute `counterCallback` get method  (execute the message locally on TVM)
response = await rootAcc.runLocal("counterCallback", {});
console.log("Contract reacted to your counterCallback:", response.decoded.output);

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
