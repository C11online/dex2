const RootTokenContract = {
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
                        "name": "root_public_key_",
                        "type": "uint256"
                    },
                    {
                        "name": "root_owner_address_",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "getVersion",
                "inputs": [
                    {
                        "name": "_answer_id",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "uint32"
                    }
                ]
            },
            {
                "name": "getDetails",
                "inputs": [
                    {
                        "name": "_answer_id",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "components": [
                            {
                                "name": "name",
                                "type": "bytes"
                            },
                            {
                                "name": "symbol",
                                "type": "bytes"
                            },
                            {
                                "name": "decimals",
                                "type": "uint8"
                            },
                            {
                                "name": "wallet_code",
                                "type": "cell"
                            },
                            {
                                "name": "root_public_key",
                                "type": "uint256"
                            },
                            {
                                "name": "root_owner_address",
                                "type": "address"
                            },
                            {
                                "name": "total_supply",
                                "type": "uint128"
                            }
                        ],
                        "name": "value0",
                        "type": "tuple"
                    }
                ]
            },
            {
                "name": "getWalletAddress",
                "inputs": [
                    {
                        "name": "_answer_id",
                        "type": "uint32"
                    },
                    {
                        "name": "wallet_public_key_",
                        "type": "uint256"
                    },
                    {
                        "name": "owner_address_",
                        "type": "address"
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
                "name": "sendExpectedWalletAddress",
                "inputs": [
                    {
                        "name": "wallet_public_key_",
                        "type": "uint256"
                    },
                    {
                        "name": "owner_address_",
                        "type": "address"
                    },
                    {
                        "name": "to",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "deployWallet",
                "inputs": [
                    {
                        "name": "tokens",
                        "type": "uint128"
                    },
                    {
                        "name": "deploy_grams",
                        "type": "uint128"
                    },
                    {
                        "name": "wallet_public_key_",
                        "type": "uint256"
                    },
                    {
                        "name": "owner_address_",
                        "type": "address"
                    },
                    {
                        "name": "gas_back_address",
                        "type": "address"
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
                "name": "deployEmptyWallet",
                "inputs": [
                    {
                        "name": "deploy_grams",
                        "type": "uint128"
                    },
                    {
                        "name": "wallet_public_key_",
                        "type": "uint256"
                    },
                    {
                        "name": "owner_address_",
                        "type": "address"
                    },
                    {
                        "name": "gas_back_address",
                        "type": "address"
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
                "name": "mint",
                "inputs": [
                    {
                        "name": "tokens",
                        "type": "uint128"
                    },
                    {
                        "name": "to",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "proxyBurn",
                "inputs": [
                    {
                        "name": "tokens",
                        "type": "uint128"
                    },
                    {
                        "name": "sender_address",
                        "type": "address"
                    },
                    {
                        "name": "send_gas_to",
                        "type": "address"
                    },
                    {
                        "name": "callback_address",
                        "type": "address"
                    },
                    {
                        "name": "callback_payload",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "tokensBurned",
                "inputs": [
                    {
                        "name": "tokens",
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
                        "name": "send_gas_to",
                        "type": "address"
                    },
                    {
                        "name": "callback_address",
                        "type": "address"
                    },
                    {
                        "name": "callback_payload",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "sendSurplusGas",
                "inputs": [
                    {
                        "name": "to",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setPaused",
                "inputs": [
                    {
                        "name": "value",
                        "type": "bool"
                    }
                ],
                "outputs": []
            },
            {
                "name": "sendPausedCallbackTo",
                "inputs": [
                    {
                        "name": "callback_id",
                        "type": "uint64"
                    },
                    {
                        "name": "callback_addr",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "transferOwner",
                "inputs": [
                    {
                        "name": "root_public_key_",
                        "type": "uint256"
                    },
                    {
                        "name": "root_owner_address_",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "name",
                "inputs": [],
                "outputs": [
                    {
                        "name": "name",
                        "type": "bytes"
                    }
                ]
            },
            {
                "name": "symbol",
                "inputs": [],
                "outputs": [
                    {
                        "name": "symbol",
                        "type": "bytes"
                    }
                ]
            },
            {
                "name": "decimals",
                "inputs": [],
                "outputs": [
                    {
                        "name": "decimals",
                        "type": "uint8"
                    }
                ]
            },
            {
                "name": "wallet_code",
                "inputs": [],
                "outputs": [
                    {
                        "name": "wallet_code",
                        "type": "cell"
                    }
                ]
            },
            {
                "name": "total_supply",
                "inputs": [],
                "outputs": [
                    {
                        "name": "total_supply",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "start_gas_balance",
                "inputs": [],
                "outputs": [
                    {
                        "name": "start_gas_balance",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "paused",
                "inputs": [],
                "outputs": [
                    {
                        "name": "paused",
                        "type": "bool"
                    }
                ]
            }
        ],
        "data": [
            {
                "key": 1,
                "name": "_randomNonce",
                "type": "uint256"
            },
            {
                "key": 2,
                "name": "name",
                "type": "bytes"
            },
            {
                "key": 3,
                "name": "symbol",
                "type": "bytes"
            },
            {
                "key": 4,
                "name": "decimals",
                "type": "uint8"
            },
            {
                "key": 5,
                "name": "wallet_code",
                "type": "cell"
            }
        ],
        "events": []
    },
    tvc: "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",
};
module.exports = { RootTokenContract };
