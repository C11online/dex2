const TONTokenWalletContract = {
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
                "name": "balance",
                "inputs": [
                    {
                        "name": "_answer_id",
                        "type": "uint32"
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
                                "name": "root_address",
                                "type": "address"
                            },
                            {
                                "name": "code",
                                "type": "cell"
                            },
                            {
                                "name": "wallet_public_key",
                                "type": "uint256"
                            },
                            {
                                "name": "owner_address",
                                "type": "address"
                            },
                            {
                                "name": "balance",
                                "type": "uint128"
                            },
                            {
                                "name": "receive_callback",
                                "type": "address"
                            },
                            {
                                "name": "bounced_callback",
                                "type": "address"
                            },
                            {
                                "name": "allow_non_notifiable",
                                "type": "bool"
                            }
                        ],
                        "name": "value0",
                        "type": "tuple"
                    }
                ]
            },
            {
                "name": "accept",
                "inputs": [
                    {
                        "name": "tokens",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            },
            {
                "name": "allowance",
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
                                "name": "remaining_tokens",
                                "type": "uint128"
                            },
                            {
                                "name": "spender",
                                "type": "address"
                            }
                        ],
                        "name": "value0",
                        "type": "tuple"
                    }
                ]
            },
            {
                "name": "approve",
                "inputs": [
                    {
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "name": "remaining_tokens",
                        "type": "uint128"
                    },
                    {
                        "name": "tokens",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            },
            {
                "name": "disapprove",
                "inputs": [],
                "outputs": []
            },
            {
                "name": "transferToRecipient",
                "inputs": [
                    {
                        "name": "recipient_public_key",
                        "type": "uint256"
                    },
                    {
                        "name": "recipient_address",
                        "type": "address"
                    },
                    {
                        "name": "tokens",
                        "type": "uint128"
                    },
                    {
                        "name": "deploy_grams",
                        "type": "uint128"
                    },
                    {
                        "name": "transfer_grams",
                        "type": "uint128"
                    },
                    {
                        "name": "send_gas_to",
                        "type": "address"
                    },
                    {
                        "name": "notify_receiver",
                        "type": "bool"
                    },
                    {
                        "name": "payload",
                        "type": "cell"
                    }
                ],
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
                        "name": "grams",
                        "type": "uint128"
                    },
                    {
                        "name": "send_gas_to",
                        "type": "address"
                    },
                    {
                        "name": "notify_receiver",
                        "type": "bool"
                    },
                    {
                        "name": "payload",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "transferFrom",
                "inputs": [
                    {
                        "name": "from",
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
                    },
                    {
                        "name": "send_gas_to",
                        "type": "address"
                    },
                    {
                        "name": "notify_receiver",
                        "type": "bool"
                    },
                    {
                        "name": "payload",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "internalTransfer",
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
                        "name": "notify_receiver",
                        "type": "bool"
                    },
                    {
                        "name": "payload",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "internalTransferFrom",
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
                        "name": "send_gas_to",
                        "type": "address"
                    },
                    {
                        "name": "notify_receiver",
                        "type": "bool"
                    },
                    {
                        "name": "payload",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "burnByOwner",
                "inputs": [
                    {
                        "name": "tokens",
                        "type": "uint128"
                    },
                    {
                        "name": "grams",
                        "type": "uint128"
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
                "name": "burnByRoot",
                "inputs": [
                    {
                        "name": "tokens",
                        "type": "uint128"
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
                "name": "setReceiveCallback",
                "inputs": [
                    {
                        "name": "receive_callback_",
                        "type": "address"
                    },
                    {
                        "name": "allow_non_notifiable_",
                        "type": "bool"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setBouncedCallback",
                "inputs": [
                    {
                        "name": "bounced_callback_",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "destroy",
                "inputs": [
                    {
                        "name": "gas_dest",
                        "type": "address"
                    }
                ],
                "outputs": []
            }
        ],
        "data": [
            {
                "key": 1,
                "name": "root_address",
                "type": "address"
            },
            {
                "key": 2,
                "name": "code",
                "type": "cell"
            },
            {
                "key": 3,
                "name": "wallet_public_key",
                "type": "uint256"
            },
            {
                "key": 4,
                "name": "owner_address",
                "type": "address"
            }
        ],
        "events": []
    },
    tvc: "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",
    code:'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',
};
module.exports = { TONTokenWalletContract };
