const path = require("path");
require("dotenv").config({
  path: "./.env"
});
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Mnemonic = process.env.MNEMONIC;
const AccountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    ganache_local: {
      provider: function(){
        return new HDWalletProvider(Mnemonic, "http://127.0.0.1:7545", AccountIndex)
      },
      network_id: 5777
    },
    ropsten:{
      provider: function(){
        return new HDWalletProvider(Mnemonic, "https://ropsten.infura.io/v3/32999ee0439f4ff6a4c0374c3e45b214",)
      },
      network_id: 3,
      gas: 4500000
    }
  },
  compilers: {
    solc: {
      version: "0.8.3",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
};