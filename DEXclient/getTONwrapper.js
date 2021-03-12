const {TonClient} = require("@tonclient/core");
const {libNode} = require("@tonclient/lib-node");
const contract = require('./TONwrapperContract.js'); //specify the path to the .js file
const contractPackage = contract.package;
const fs = require('fs');
const pathJson = './TONwrapperContract.json';

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

    let resultQC = await client.net.query_collection({
      collection: 'accounts',
      filter: { id: { eq: contractAddress } },
      result: 'boc'
    });
    let paramsOfEncodeMessage = {
      abi: abi,
      address: contractAddress,
      call_set: {
        function_name: 'getZeroAddress',
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

    let response = await client.tvm.run_tvm(paramsOfRunTvm);
    console.log('Contract reacted to your getZeroAddress:', response.decoded.output);

    resultQC = await client.net.query_collection({
      collection: 'accounts',
      filter: { id: { eq: contractAddress } },
      result: 'boc'
    });
    paramsOfEncodeMessage = {
      abi: abi,
      address: contractAddress,
      call_set: {
        function_name: 'getBalanceTONgrams',
        input: {}
      },
      signer: { type: 'None' },
    };

    resultEM = await client.abi.encode_message(paramsOfEncodeMessage);
    paramsOfRunTvm = {
      message: resultEM.message,
      account: resultQC.result[0].boc,
      abi: abi,
    };

    response = await client.tvm.run_tvm(paramsOfRunTvm);
    console.log('Contract reacted to your getBalanceTONgrams:', response.decoded.output);

    resultQC = await client.net.query_collection({
          collection: 'accounts',
          filter: { id: { eq: contractAddress } },
          result: 'boc'
        });
        paramsOfEncodeMessage = {
          abi: abi,
          address: contractAddress,
          call_set: {
            function_name: 'getAllQueue',
            input: {}
          },
          signer: {
            type: 'Keys',
            keys: contractKeys }
        };

        resultEM = await client.abi.encode_message(paramsOfEncodeMessage);
        paramsOfRunTvm = {
          message: resultEM.message,
          account: resultQC.result[0].boc,
          abi: abi,
        };

        response = await client.tvm.run_tvm(paramsOfRunTvm);
        console.log('Contract reacted to your getAllQueue:', response.decoded.output);




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
      console.log("Hello net.ton.dev TON!");
      await main(client);
      process.exit(0);
    } catch (error) {
      console.error(error);
    }
  })();
