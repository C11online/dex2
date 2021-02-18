const {TonClient} = require("@tonclient/core");
const {libNode} = require("@tonclient/lib-node");
const contract = require('./DEXpairContract.js'); //specify the path to the .js file
const fs = require('fs');
const converter = require('hex2dec');
const pathJson = './DEXpairContract.json';
const rootTokenA = "0:cf5d9b0d7fe0dd14f8d75b9c511fab9805ae64dc4c1f08b955c69e44193518a1";
const walletTokenA = "0:f7e4793a296f6f41f6a74f497bf5db4538c98df067f97a5a5d9fd3fec3ed6967";
const rootTokenB = "0:eaa4b8e54760d2922d6e23da188d7a2c6824ed108a7c15be5de7b97d9740253e";
const walletTokenB = "0:8de0c102119c9226d6b96a23f5816ba04ada4447ecab8fd3b1e8a1022b2126ae";


async function main(client) {
  try{
    const contractJson = fs.readFileSync(pathJson,{encoding: "utf8"});
    const contractData = JSON.parse(contractJson);
    const contractAddress = contractData.address;
    const contractKeys = contractData.keys;
    const abi = {
      type: 'Contract',
      value: contract.package.abi
    };

    const params = {
      send_events: false,
      message_encode_params: {
        address: contractAddress,
        abi: {
          type: 'Contract',
          value: contract.package.abi
        },
        call_set: {
          function_name: 'setPair',
          input: {
            arg0: rootTokenA,
            arg1: walletTokenA,
            arg2: rootTokenB,
            arg3: walletTokenB,
          }
        },
        signer: {
          type: 'Keys',
          keys: contractKeys }
        }
      }

      let response = await client.processing.process_message(params);
      console.log('Your setPair proceed. Tx id: ', response.transaction.id);
      console.log('Your setPair output: ', response.decoded.output);

      let resultQC = await client.net.query_collection({
            collection: 'accounts',
            filter: { id: { eq: contractAddress } },
            result: 'boc'
          });
          let  paramsOfEncodeMessage = {
            abi: abi,
            address: contractAddress,
            call_set: {
              function_name: 'getPair',
              input: {}
            },
            signer: { type: 'None' },
          };

          let resultEM = await client.abi.encode_message(paramsOfEncodeMessage);
          let paramsOfRunTvm = {
            message: resultEM.message,
            account: resultQC.result[0].boc,
            abi: abi,
          };

          response = await client.tvm.run_tvm(paramsOfRunTvm);
          console.log('Contract reacted to your getPair:', response.decoded.output);


    }catch(err){
      console.log(err);
    }
  }

  (async () => {
    try {
      TonClient.useBinaryLibrary(libNode);
      const client = new TonClient({
        network: {
          server_address: 'net.ton.dev'
        }
      });
      console.log("Hello net.ton.dev!");
      await main(client);
      process.exit(0);
    } catch (error) {
      console.error(error);
    }
  })();
