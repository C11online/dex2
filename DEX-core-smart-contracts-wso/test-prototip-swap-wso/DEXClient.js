const DEXClientContract = {
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
                "name": "getConnectorAddress",
                "inputs": [
                    {
                        "name": "_answer_id",
                        "type": "uint32"
                    },
                    {
                        "name": "connectorSoArg",
                        "type": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "connectRoot",
                "inputs": [
                    {
                        "name": "root",
                        "type": "address"
                    },
                    {
                        "name": "souint",
                        "type": "uint256"
                    },
                    {
                        "name": "gramsToConnector",
                        "type": "uint128"
                    },
                    {
                        "name": "gramsToRoot",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "statusConnected",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "connectCallback",
                "inputs": [
                    {
                        "name": "wallet",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "transferAB",
                "inputs": [
                    {
                        "name": "rootA",
                        "type": "address"
                    },
                    {
                        "name": "rootB",
                        "type": "address"
                    },
                    {
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "name": "tokens",
                        "type": "uint128"
                    },
                    {
                        "name": "grams",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "statusTransfer",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "tokensReceivedCallback",
                "inputs": [
                    {
                        "name": "token_wallet",
                        "type": "address"
                    },
                    {
                        "name": "token_root",
                        "type": "address"
                    },
                    {
                        "name": "amount",
                        "type": "uint128"
                    },
                    {
                        "name": "sender_public_key",
                        "type": "uint256"
                    },
                    {
                        "name": "sender_address",
                        "type": "address"
                    },
                    {
                        "name": "sender_wallet",
                        "type": "address"
                    },
                    {
                        "name": "original_gas_to",
                        "type": "address"
                    },
                    {
                        "name": "updated_balance",
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
                "name": "getCallback",
                "inputs": [
                    {
                        "name": "id",
                        "type": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "token_wallet",
                        "type": "address"
                    },
                    {
                        "name": "token_root",
                        "type": "address"
                    },
                    {
                        "name": "amount",
                        "type": "uint128"
                    },
                    {
                        "name": "sender_public_key",
                        "type": "uint256"
                    },
                    {
                        "name": "sender_address",
                        "type": "address"
                    },
                    {
                        "name": "sender_wallet",
                        "type": "address"
                    },
                    {
                        "name": "original_gas_to",
                        "type": "address"
                    },
                    {
                        "name": "updated_balance",
                        "type": "uint128"
                    },
                    {
                        "name": "payload_type",
                        "type": "uint8"
                    },
                    {
                        "name": "payload_root",
                        "type": "address"
                    },
                    {
                        "name": "payload_wallet",
                        "type": "address"
                    }
                ]
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
                "name": "codeDEXConnector",
                "inputs": [],
                "outputs": [
                    {
                        "name": "codeDEXConnector",
                        "type": "cell"
                    }
                ]
            },
            {
                "name": "roots",
                "inputs": [],
                "outputs": [
                    {
                        "name": "roots",
                        "type": "map(address,address)"
                    }
                ]
            },
            {
                "name": "rootConnector",
                "inputs": [],
                "outputs": [
                    {
                        "name": "rootConnector",
                        "type": "map(address,address)"
                    }
                ]
            },
            {
                "name": "connectors",
                "inputs": [],
                "outputs": [
                    {
                        "components": [
                            {
                                "name": "root_address",
                                "type": "address"
                            },
                            {
                                "name": "souint",
                                "type": "uint256"
                            },
                            {
                                "name": "status",
                                "type": "bool"
                            }
                        ],
                        "name": "connectors",
                        "type": "map(address,tuple)"
                    }
                ]
            },
            {
                "name": "counterCallback",
                "inputs": [],
                "outputs": [
                    {
                        "name": "counterCallback",
                        "type": "uint256"
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
                "name": "codeDEXConnector",
                "type": "cell"
            }
        ],
        "events": []
    },
    tvc: "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",
};
module.exports = { DEXClientContract };