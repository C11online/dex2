#!/bin/sh

NETWORK=$(./configes/get_network.sh)
CONTRACTS=$(./configes/get_contractsAB.sh)
TVM_LINKER=$(./configes/get_tvm_linker.sh)
TONOS_CLI=$(./configes/get_tonos_cli.sh)

# echo $NETWORK
# echo $CONTRACTS
# echo $TVM_LINKER
# echo $TONOS_CLI

AMOUNT_TONS=6000000000
GIVER="0:841288ed3b55d9cdafa806807f02a0ae0c169aa5edfe88a789a6482429756a94"
# CODE=$($TVM_LINKER decode --tvc ../$CONTRACTS/RootTokenContract.tvc  | grep code: | cut -c 8-)
# CODE=$($TVM_LINKER decode --tvc ../$CONTRACTS/RootTokenContract.tvc | grep code: | cut -c 8-)
CODE=$(cat ./code.txt) #export TVM_WALLET_CODE=`cat code.txt`
KEYS_FILE="./pairA-B/deploy.keys.json"
PUBKEY=$(cat $KEYS_FILE | grep public | cut -c 14-77)


# CODE=$(./tvm_linker decode --tvc ../contracts/TTW_FT.tvc  | grep code: | cut -c 8-)

ROOT_NAME=$(echo -n "RootA" | xxd -p )
ROOT_SYMBOL=$(echo -n "RTA" | xxd -p )
ROOT_DECIMALS="9"
ROOT_OWNER_PK=$PUBKEY
ROOT_OWNER=0
ROOT_OWNER_ADDRESS=$ZERO_ADDRESS
ROOT_CODE=$CODE
TOTAL_SUPPLY="1000000" 

# ROOT_DATA='{"_name":"'$ROOT_NAME'","_symbol":"'$ROOT_SYMBOL'","_decimals":'$ROOT_DECIMALS',"_rootPublicKey":"0x'$ROOT_OWNER_PK'","_rootOwnerAddress":"'$ZERO_ADDRESS'","_code":"'$CODE'"}'
echo ========================================================================
echo Deploy pair A-B
PAIR_ADDR_FILE="./pairA-B/address.json"
PAIR_ADDR=$(cat $PAIR_ADDR_FILE | grep address | cut -c 15-80)
echo pairA-B: $PAIR_ADDR

ROOT_A_ADDR_FILE="./RootA/address.json"
ROOT_A_ADDR=$(cat $ROOT_A_ADDR_FILE | grep address | cut -c 15-80)
echo RootA: $ROOT_A_ADDR

ROOT_B_ADDR_FILE="./RootB/address.json"
ROOT_B_ADDR=$(cat $ROOT_B_ADDR_FILE | grep address | cut -c 15-80)
echo RootB: $ROOT_B_ADDR



# $TONOS_CLI -u $NETWORK call $GIVER sendGrams "{\"dest\":\"$PAIR_ADDR\",\"amount\":\"$AMOUNT_TONS\"}" --abi ./local_giver.abi.json > /dev/null

if [ $NETWORK = "http://127.0.0.1" ]
then
    $TONOS_CLI -u $NETWORK call 0:841288ed3b55d9cdafa806807f02a0ae0c169aa5edfe88a789a6482429756a94 sendGrams "{\"dest\":\"$PAIR_ADDR\",\"amount\":\"$AMOUNT_TONS\"}" --abi ./local_giver.abi.json > /dev/null
elif [ $NETWORK = "https://net.ton.dev" ]
then
    $TONOS_CLI -u $NETWORK call 0:2225d70ebde618b9c1e3650e603d6748ee6495854e7512dfc9c287349b4dc988 pay '{"addr":"'$PAIR_ADDR'"}' --abi ./giver.abi.json   
fi



ROOT_DATA='{"root0":"'$ROOT_A_ADDR'","root1":"'$ROOT_B_ADDR'"}'
# '{"name":"${nameRootTokenHex}","symbol":"${symbolRootTokenHex}", "decimals":"${decimals}","root_public_key":"0x${contractKeysPublic}", "root_owner":"${root_owner}", "wallet_code":"'${TVM_WALLET_CODE.TVM_WALLET_CODE}'","total_supply":"${total_supply}"}'
# root0, address root1

RESULT_DEPLOY=$($TONOS_CLI -u $NETWORK deploy ./sol/DEXpair.tvc $ROOT_DATA --abi ./sol/DEXpair.abi.json --sign ./pairA-B/deploy.keys.json --wc 0 | grep "Transaction" | cut -c 12-) 
echo Status Deploy: $RESULT_DEPLOY

ACCOUNT_STATUS=$($TONOS_CLI -u $NETWORK account $PAIR_ADDR | grep "acc_type:" | cut -c 10-)
echo Status account: $ACCOUNT_STATUS

GETTOTALSUPPLY=$($TONOS_CLI -u $NETWORK run $PAIR_ADDR getTotalSupply {} --abi ./sol/DEXpair.abi.json | grep "value0" | cut -c 13-)
echo Pair reserve Total supply: $GETTOTALSUPPLY

# getBalanceTONgrams
GETBALANCETONGRAMS=$($TONOS_CLI -u $NETWORK run $PAIR_ADDR getBalanceTONgrams {} --abi ./sol/DEXpair.abi.json | grep "balanceTONgrams" | cut -c 21-)
echo Get Balance TON grams: $GETBALANCETONGRAMS

# getReservesBalance() 
GETRESERVEBALANCEA=$($TONOS_CLI -u $NETWORK run $PAIR_ADDR getReservesBalance {} --abi ./sol/DEXpair.abi.json | grep "balanceReserveA" | cut -c 22-)
echo Get Reserves Root "A" Balance: $GETRESERVEBALANCEA

# getReservesBalance() 
GETRESERVEBALANCEB=$($TONOS_CLI -u $NETWORK run $PAIR_ADDR getReservesBalance {} --abi ./sol/DEXpair.abi.json | grep "balanceReserveB" | cut -c 22-)
echo Get Reserves Root "B" Balance: $GETRESERVEBALANCEB