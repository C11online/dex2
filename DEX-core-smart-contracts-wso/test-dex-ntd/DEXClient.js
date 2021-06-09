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
                "name": "connectPair",
                "inputs": [
                    {
                        "name": "pairAddr",
                        "type": "address"
                    }
                ],
                "outputs": [
                    {
                        "name": "statusConnection",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "setPair",
                "inputs": [
                    {
                        "name": "arg0",
                        "type": "address"
                    },
                    {
                        "name": "arg1",
                        "type": "address"
                    },
                    {
                        "name": "arg2",
                        "type": "address"
                    },
                    {
                        "name": "arg3",
                        "type": "address"
                    },
                    {
                        "name": "arg4",
                        "type": "address"
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
                "name": "getAllDataPreparation",
                "inputs": [],
                "outputs": [
                    {
                        "name": "pairKeysR",
                        "type": "address[]"
                    },
                    {
                        "name": "rootKeysR",
                        "type": "address[]"
                    }
                ]
            },
            {
                "name": "processSwapA",
                "inputs": [
                    {
                        "name": "pairAddr",
                        "type": "address"
                    },
                    {
                        "name": "qtyA",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "processSwapStatus",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "processSwapB",
                "inputs": [
                    {
                        "name": "pairAddr",
                        "type": "address"
                    },
                    {
                        "name": "qtyB",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "processSwapStatus",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "processLiquidity",
                "inputs": [
                    {
                        "name": "pairAddr",
                        "type": "address"
                    },
                    {
                        "name": "qtyA",
                        "type": "uint128"
                    },
                    {
                        "name": "qtyB",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "processLiquidityStatus",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "returnLiquidity",
                "inputs": [
                    {
                        "name": "pairAddr",
                        "type": "address"
                    },
                    {
                        "name": "tokens",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "returnLiquidityStatus",
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
                "name": "createNewPair",
                "inputs": [
                    {
                        "name": "root0",
                        "type": "address"
                    },
                    {
                        "name": "root1",
                        "type": "address"
                    },
                    {
                        "name": "pairSoArg",
                        "type": "uint256"
                    },
                    {
                        "name": "connectorSoArg0",
                        "type": "uint256"
                    },
                    {
                        "name": "connectorSoArg1",
                        "type": "uint256"
                    },
                    {
                        "name": "rootSoArg",
                        "type": "uint256"
                    },
                    {
                        "name": "rootName",
                        "type": "bytes"
                    },
                    {
                        "name": "rootSymbol",
                        "type": "bytes"
                    },
                    {
                        "name": "rootDecimals",
                        "type": "uint8"
                    },
                    {
                        "name": "grammsForPair",
                        "type": "uint128"
                    },
                    {
                        "name": "grammsForRoot",
                        "type": "uint128"
                    },
                    {
                        "name": "grammsForConnector",
                        "type": "uint128"
                    },
                    {
                        "name": "grammsForWallet",
                        "type": "uint128"
                    },
                    {
                        "name": "grammsTotal",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            },
            {
                "name": "sendTokens",
                "inputs": [
                    {
                        "name": "tokenRoot",
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
                        "name": "sendTokenStatus",
                        "type": "bool"
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
                "name": "rootKeys",
                "inputs": [],
                "outputs": [
                    {
                        "name": "rootKeys",
                        "type": "address[]"
                    }
                ]
            },
            {
                "name": "rootWallet",
                "inputs": [],
                "outputs": [
                    {
                        "name": "rootWallet",
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
                "name": "counterCallback",
                "inputs": [],
                "outputs": [
                    {
                        "name": "counterCallback",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "pairs",
                "inputs": [],
                "outputs": [
                    {
                        "components": [
                            {
                                "name": "status",
                                "type": "bool"
                            },
                            {
                                "name": "rootA",
                                "type": "address"
                            },
                            {
                                "name": "walletA",
                                "type": "address"
                            },
                            {
                                "name": "rootB",
                                "type": "address"
                            },
                            {
                                "name": "walletB",
                                "type": "address"
                            },
                            {
                                "name": "rootAB",
                                "type": "address"
                            }
                        ],
                        "name": "pairs",
                        "type": "map(address,tuple)"
                    }
                ]
            },
            {
                "name": "pairKeys",
                "inputs": [],
                "outputs": [
                    {
                        "name": "pairKeys",
                        "type": "address[]"
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
                "name": "codeDEXConnector",
                "type": "cell"
            }
        ],
        "events": []
    },
    tvc: "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",
};
module.exports = { DEXClientContract };