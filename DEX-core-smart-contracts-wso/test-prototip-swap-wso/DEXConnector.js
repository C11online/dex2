const DEXConnectorContract = {
    abi: {
        "ABI version": 2,
        "header": [
            "pubkey",
            "time",
            "expire"
        ],
        "functions": [
            {
                "name": "constructor",
                "inputs": [],
                "outputs": []
            },
            {
                "name": "deployEmptyWallet",
                "inputs": [
                    {
                        "name": "root",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "expectedWalletAddressCallback",
                "inputs": [
                    {
                        "name": "wallet",
                        "type": "address"
                    },
                    {
                        "name": "wallet_public_key",
                        "type": "uint256"
                    },
                    {
                        "name": "owner_address",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setTransferCallback",
                "inputs": [],
                "outputs": []
            },
            {
                "name": "setBouncedCallback",
                "inputs": [],
                "outputs": []
            },
            {
                "name": "transfer",
                "inputs": [
                    {
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "name": "tokens",
                        "type": "uint128"
                    },
                    {
                        "name": "payload",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "getBalance",
                "inputs": [],
                "outputs": [
                    {
                        "name": "balance",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "soUINT",
                "inputs": [],
                "outputs": [
                    {
                        "name": "soUINT",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "dexclient",
                "inputs": [],
                "outputs": [
                    {
                        "name": "dexclient",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "drivenRoot",
                "inputs": [],
                "outputs": [
                    {
                        "name": "drivenRoot",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "driven",
                "inputs": [],
                "outputs": [
                    {
                        "name": "driven",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "statusConnected",
                "inputs": [],
                "outputs": [
                    {
                        "name": "statusConnected",
                        "type": "bool"
                    }
                ]
            }
        ],
        "data": [
            {
                "key": 1,
                "name": "soUINT",
                "type": "uint256"
            },
            {
                "key": 2,
                "name": "dexclient",
                "type": "address"
            }
        ],
        "events": []
    },
    tvc: "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",
    code:'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',
};
module.exports = { DEXConnectorContract };
