const GiverContract = {
    abi: {
        "ABI version": 2,
        "header": [
            "pubkey",
            "time",
            "expire"
        ],
        "functions": [
            {
                "name": "sendTransaction",
                "inputs": [
                    {
                        "name": "dest",
                        "type": "address"
                    },
                    {
                        "name": "value",
                        "type": "uint128"
                    },
                    {
                        "name": "bounce",
                        "type": "bool"
                    }
                ],
                "outputs": []
            },
            {
                "name": "getIncome",
                "inputs": [
                    {
                        "name": "sender",
                        "type": "address"
                    }
                ],
                "outputs": [
                    {
                        "name": "balance",
                        "type": "uint128"
                    },
                    {
                        "name": "ts",
                        "type": "uint32[]"
                    },
                    {
                        "name": "values",
                        "type": "uint128[]"
                    }
                ]
            },
            {
                "name": "getOutgoing",
                "inputs": [
                    {
                        "name": "receiver",
                        "type": "address"
                    }
                ],
                "outputs": [
                    {
                        "name": "balance",
                        "type": "uint128"
                    },
                    {
                        "name": "ts",
                        "type": "uint32[]"
                    },
                    {
                        "name": "values",
                        "type": "uint128[]"
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
                "name": "constructor",
                "inputs": [],
                "outputs": []
            }
        ],
        "data": [],
        "events": []
    },
    tvc: "te6ccgECJAEABPoAAgE0AwEBAcACAEPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgBCj/AIrtUyDjAyDA/+MCIMD+4wLyCyIHBCMBAAUC/I0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABPhpIds80wABjh2BAgDXGCD5AQHTAAGU0/8DAZMC+ELiIPhl+RDyqJXTAAHyeuLTPwGOHfhDIbkgnzAg+COBA+iogggbd0Cgud6TIPhj4PI02DDTHwH4I7zyuQ0GARTTHwHbPPhHbvJ8CAJYItDTA/pAMPhpqTgA3CHHACCfMCHXDR/yvCHAACCSbCHe3+MCAds8+Edu8nwaCANAIIIQMV75NbuOgOAgghBotV8/u46A4CCCEHr3hDC64wIQCwkEqDD4QW7jAPpBit/R2zwjwP+OOiXQ0wH6QDAxyM+HIM6NBAAAAAAAAAAAAAAAAA+veEMIzxYjzwt/Im8iAssf9AAhbyICyx/0AMlw+wDeXwPjAH/4ZyEXChwCYnBwbW8CcG1vAvhFIG6SMHDe+EK68uBm+AAj+EqBAQv0CoqK4iBvEjQgbxAzbxExbBMgHwIoIIIQZeAXIbrjAiCCEGi1Xz+64wIODAIqMPhBbuMA+Ebyc3H4ZtH4ANs8f/hnDRwAhO1E0CDXScIBjhfT/9M/0wD0BPQF+Gv4an/4Yfhm+GP4Yo4e9AVt+Gpt+GtwAYBA9A7yvdcL//hicPhjcPhmf/hh4gSoMPhBbuMA+kGK39HbPCPA/446JdDTAfpAMDHIz4cgzo0EAAAAAAAAAAAAAAAADl4BchjPFiPPC38ibyICyx/0ACFvIgLLH/QAyXD7AN5fA+MAf/hnIRcPHAJicHBtbwJwbW8C+EUgbpIwcN74Qrry4Gb4ACP4S4EBC/QKioriIG8SNCBvEDNvETFsEyAfAiggghAmJ2hxuuMCIIIQMV75NbrjAhgRBCQw+EFu4wD6QYrf1w1/it/XDAAhFxYSAxSK39HbPNs8f/hnFRMcBP74RSBukjBw3vhCuvLgZvgA+CdvECK88rxUcSDIz4WAygBzz0DOAfoCgGvPQMlz+wAi+EuBAQv0CoqK4vgjIW8SUyJvECPIyx8BbyIhpANZgCD0Q28Cb1AzUyJvESbIy38BbyIhpANZgCD0Q28Cb1EzVHIEoLV/b1IzJfhLJNs8IB8dFAAUWYEBC/RB+GtfBgAK1NHQ0gAACtTR0NN/AArU0dD6QAJ0MNHbPCHA/44qI9DTAfpAMDHIz4cgzo0EAAAAAAAAAAAAAAAACmJ2hxjPFiHPC3/JcPsA3jDjAH/4ZxkcACxw+EUgbpIwcN74Qrry4Gb4APgnbxAxBGT4QW7jAPgj+En4SoEBC/QKioriIG8SUxFvECTIyx8BbyIhpANZgCD0Q28Cb1AyUxFvESEgHxsEYts8yMt/AW8iIaQDWYAg9ENvAm9RMlzbPKC1f29SMvhJ+Eoj2zxZgQEL9EH4al8D2zweHh0cADb4QsjL//hDzws/+EbPCwD4SvhLAvQA9ADJ7VQAMG8jAsgBbyJZzwsf9AABbyJZzwsf9ADLfwAYcGim+2CVaKb+YDHfABZwbW8CcG1vAnBvAwAq0x/0BFlvAgHTH/QEWW8CAdcLf28DADTtRNDT/9M/0wD0BPQF+Gv4an/4Yfhm+GP4YgEK9KQg9KEjAAA=",
};
module.exports = { GiverContract };