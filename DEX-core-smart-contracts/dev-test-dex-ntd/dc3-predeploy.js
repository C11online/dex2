const {TonClient, abiContract, signerKeys} = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");
const { DEXRootContract } = require("./DEXRoot.js");
const { DEXClientContract } = require("./DEXClient.js");
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

async function main(client) {
  let responce;
  const rootAddr = JSON.parse(fs.readFileSync(pathJsonRoot,{encoding: "utf8"})).address;
  const rootAcc = new Account(DEXRootContract, {address: rootAddr,client,});

  const SEED_PHRASE_WORD_COUNT = 12;
  const SEED_PHRASE_DICTIONARY_ENGLISH = 1;
  const HD_PATH = "m/44'/396'/0'/0/0";

  const { crypto } = client;
  const { phrase } = await crypto.mnemonic_from_random({
    dictionary: SEED_PHRASE_DICTIONARY_ENGLISH,
    word_count: SEED_PHRASE_WORD_COUNT,
  });
  console.log(`Generated seed phrase "${phrase}"`);

  let keyPair = await crypto.mnemonic_derive_sign_keys({
    phrase,
    path: HD_PATH,
    dictionary: SEED_PHRASE_DICTIONARY_ENGLISH,
    word_count: SEED_PHRASE_WORD_COUNT,
  });

  const clientKeys = signerKeys(keyPair);
  console.log(clientKeys);

  console.log("clientKeys.keys.public:", clientKeys.keys.public);
  let pubkey = '0x'+clientKeys.keys.public;

  let status = false;
  let targetShard = getShard(rootAddr);
  let n = 0;
  while (!status) {
    response = await rootAcc.runLocal("getClientAddress", {_answer_id:0,clientPubKey:pubkey,clientSoArg:n});
    let clientAddr = response.decoded.output.value0;
    let shard = getShard(clientAddr);
    if (shard == targetShard) {
      console.log("Bingo!");
      console.log("clientSoArg:", n);
      console.log("clientAddress:", clientAddr);
      let keyJson = JSON.stringify({address:clientAddr, keys:clientKeys, clientSoArg:n, seed:phrase});
      fs.writeFileSync( pathJsonClient, keyJson,{flag:'w'});
      console.log("Address, keys, seed, SoArg of the DEXclient written successfully to:", pathJsonClient);
      status = true;
    } else {console.log(n);}
    n++;
  }

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
