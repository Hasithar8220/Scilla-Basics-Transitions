const { BN, Long, bytes, units } = require('@zilliqa-js/util');
const { Zilliqa } = require('@zilliqa-js/zilliqa');
const {
  toBech32Address,
  getAddressFromPrivateKey,
} = require('@zilliqa-js/crypto');

const zilliqa = new Zilliqa('https://dev-api.zilliqa.com');
const config = require('./config.json');

const privateKey =config.contractOwnerPK;
zilliqa.wallet.addByPrivateKey(privateKey);
const address = getAddressFromPrivateKey(privateKey);

(async function (){

  let contractaddress=toBech32Address('cd4a62e584e27395c2f2c6bba11a853a5f2341ab') ;

  const state = await zilliqa.blockchain.getSmartContractState(contractaddress);

  console.log(state);

    })();