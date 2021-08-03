const UserList = artifacts.require("./UserList.sol");

contract("UserList", (accounts) => {
  it("...should register an user", async () => {
    const UserListInstance = await UserList.deployed();
    await UserListInstance.register(web3.utils.utf8ToHex("Ricardo"), { from: accounts[0] });
    const storedData = await UserListInstance.users(accounts[0]);
    assert.equal("Ricardo", web3.utils.hexToUtf8(storedData['0']), "The user isn't registered.");
  });
});
