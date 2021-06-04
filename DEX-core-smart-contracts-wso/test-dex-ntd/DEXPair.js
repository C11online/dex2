const DEXPairContract = {
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
                "inputs": [
                    {
                        "name": "souintA",
                        "type": "uint256"
                    },
                    {
                        "name": "souintB",
                        "type": "uint256"
                    },
                    {
                        "name": "gramsDeployConnector",
                        "type": "uint128"
                    },
                    {
                        "name": "gramsDeployWallet",
                        "type": "uint128"
                    }
                ],
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
                "name": "connect",
                "inputs": [],
                "outputs": []
            },
            {
                "name": "getQuotient",
                "inputs": [
                    {
                        "name": "min",
                        "type": "uint128"
                    },
                    {
                        "name": "max",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "getRemainder",
                "inputs": [
                    {
                        "name": "min",
                        "type": "uint128"
                    },
                    {
                        "name": "max",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "uint128"
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
                "name": "burnCallback",
                "inputs": [
                    {
                        "name": "tokens",
                        "type": "uint128"
                    },
                    {
                        "name": "payload",
                        "type": "cell"
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
                        "name": "wallet_address",
                        "type": "address"
                    },
                    {
                        "name": "send_gas_to",
                        "type": "address"
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
                        "name": "payload_arg0",
                        "type": "uint8"
                    },
                    {
                        "name": "payload_arg1",
                        "type": "address"
                    },
                    {
                        "name": "payload_arg2",
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
                "name": "rootDEX",
                "inputs": [],
                "outputs": [
                    {
                        "name": "rootDEX",
                        "type": "address"
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
                "name": "creator",
                "inputs": [],
                "outputs": [
                    {
                        "name": "creator",
                        "type": "address"
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
                "name": "rootA",
                "inputs": [],
                "outputs": [
                    {
                        "name": "rootA",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "rootB",
                "inputs": [],
                "outputs": [
                    {
                        "name": "rootB",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "rootAB",
                "inputs": [],
                "outputs": [
                    {
                        "name": "rootAB",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "walletReserve",
                "inputs": [],
                "outputs": [
                    {
                        "name": "walletReserve",
                        "type": "map(address,address)"
                    }
                ]
            },
            {
                "name": "syncStatus",
                "inputs": [],
                "outputs": [
                    {
                        "name": "syncStatus",
                        "type": "map(address,bool)"
                    }
                ]
            },
            {
                "name": "balanceReserve",
                "inputs": [],
                "outputs": [
                    {
                        "name": "balanceReserve",
                        "type": "map(address,uint128)"
                    }
                ]
            },
            {
                "name": "totalSupply",
                "inputs": [],
                "outputs": [
                    {
                        "name": "totalSupply",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "processingStatus",
                "inputs": [],
                "outputs": [
                    {
                        "name": "processingStatus",
                        "type": "map(address,map(address,bool))"
                    }
                ]
            },
            {
                "name": "processingData",
                "inputs": [],
                "outputs": [
                    {
                        "name": "processingData",
                        "type": "map(address,map(address,uint128))"
                    }
                ]
            },
            {
                "name": "processingDest",
                "inputs": [],
                "outputs": [
                    {
                        "name": "processingDest",
                        "type": "map(address,map(address,address))"
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
                "name": "rootDEX",
                "type": "address"
            },
            {
                "key": 2,
                "name": "soUINT",
                "type": "uint256"
            },
            {
                "key": 3,
                "name": "creator",
                "type": "address"
            },
            {
                "key": 4,
                "name": "codeDEXConnector",
                "type": "cell"
            },
            {
                "key": 5,
                "name": "rootA",
                "type": "address"
            },
            {
                "key": 6,
                "name": "rootB",
                "type": "address"
            },
            {
                "key": 7,
                "name": "rootAB",
                "type": "address"
            }
        ],
        "events": []
    },
    tvc: "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",
};
module.exports = { DEXPairContract };