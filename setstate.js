const { BN, Long, bytes, units } = require('@zilliqa-js/util');
const { Zilliqa } = require('@zilliqa-js/zilliqa');
const {
  toBech32Address,
  getAddressFromPrivateKey,
} = require('@zilliqa-js/crypto');

const zilliqa = new Zilliqa('https://dev-api.zilliqa.com');
const config = require('./config.json');


const chainId = config.chainId; // chainId of the developer testnet
const msgVersion = config.msgVersion; // current msgVersion
const VERSION = bytes.pack(chainId, msgVersion);

// Populate the wallet with an account
const privateKey =config.contractOwnerPK;
zilliqa.wallet.addByPrivateKey(privateKey);


(async function (){

let contractaddress=toBech32Address('cd4a62e584e27395c2f2c6bba11a853a5f2341ab') ;
const myGasPrice = units.toQa('1000', units.Units.Li); // Gas Price that will be used by all transactions
const contract = zilliqa.contracts.at(contractaddress);

  const callTx = await contract.call(
    'setStatus',
    [
        {
            vname: 'msg',
            type: 'String',
            value: 'ContractCompleted'
        }
    ], {
      // amount, gasPrice and gasLimit must be explicitly provided
      version: VERSION,
      amount: new BN(0),
      gasPrice: myGasPrice,
      gasLimit: Long.fromNumber(10000),
    },
    33,
    100,
    false,
  );
  console.log(JSON.stringify(callTx.receipt, null, 4));

    })();