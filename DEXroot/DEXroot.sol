pragma ton-solidity >= 0.36.0;
pragma AbiHeader expire;
pragma AbiHeader time;
pragma AbiHeader pubkey;
import "DEXclient.sol"; //check path

contract DEXroot {
    //TODO refactor state
    TvmCell m_DEXclientCode;
    address m_dexClientAddress;

    modifier alwaysAccept {
        tvm.accept();
        _;
    }

    constructor(TvmCell DEXclientCode) public {
        tvm.accept();
        m_DEXclientCode = DEXclientCode;
    }

    function getAddress () public view returns(address clientAddress, TvmCell code1){
        clientAddress = m_dexClientAddress;
        code1 = m_DEXclientCode;
    }
    //TODO refactor => need to check msg.sender sholud be equal to DEXclient type

    //pubkey - need to gen keys
    function deployNewDexClient(uint256 pubkey) public alwaysAccept returns (address newAddress){

        //TODO check deploy cost
        uint128 grams = 1000000000;
        uint256 pubk = pubkey;

        m_dexClientAddress = new DEXclient{
        value: grams,
        code: m_DEXclientCode,
        pubkey: pubk
        }();
        newAddress = m_dexClientAddress;
    }
}
