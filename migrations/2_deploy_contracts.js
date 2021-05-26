let SimpleStorage = artifacts.require("./SimpleStorage.sol");
let ResourceList = artifacts.require("./ResourceList");
let UserList = artifacts.require("./UserList");


module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(ResourceList);
  deployer.deploy(UserList);
};
