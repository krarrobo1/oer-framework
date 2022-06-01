const ResourceList = artifacts.require("./ResourceList.sol");

contract("ResourceList", (accounts) => {
  it("...should register an OER", async () => {
    const ResourceListInstance = await ResourceList.deployed();
    await ResourceListInstance.addResource(
      web3.utils.utf8ToHex("My awesome OER"),
      web3.utils.utf8ToHex("Ricardo Arrobo"),
      "0x7B502C3A1F48C8609AE212CDFB639DEE39673F5E",
      "0x7B502C3A1F48C8609AE212CDFB639DEE39673F5E",
      1,
      { from: accounts[0] });

    const storedData = await ResourceListInstance.resources("0x7B502C3A1F48C8609AE212CDFB639DEE39673F5E");
    assert.equal(accounts[0], storedData['0'], "The OER isn't registered.");
  });

  it("..should register OER usage", async () => {
    const ResourceListInstance = await ResourceList.deployed();
    let filehash = "0x7B502C3A1F48C8609AE212CDFB639DEE39673F5E";
    let response = await ResourceListInstance.registerUsage(
      filehash,
      1,
      "I'm using the OER for studying",
      { from: accounts[0] });
    assert.equal(true, response.receipt.status, "The OER Usage isn't registered.");
  });

  it("..should register OER adaptation", async () => {
    const ResourceListInstance = await ResourceList.deployed();
    await ResourceListInstance.addAdaptation(
      web3.utils.utf8ToHex("My awesome OER"),
      web3.utils.utf8ToHex("Ricardo Arrobo"),
      "0x7B502C3A1F48C8609AE212CDFB639DEE39673F5CV",
      "0x7B502C3A1F48C8609AE212CDFB639DEE39673F5E",
      1,
      1,
      "0x7B502C3A1F48C8609AE212CDFB639DEE39673F5E",
      "Bran d new adaptation..",
      { from: accounts[0] });

    const storedData = await ResourceListInstance.resources("0x7B502C3A1F48C8609AE212CDFB639DEE39673F5E");
    assert.equal(accounts[0], storedData['0'], "The OER isn't registered.");
  });

});
