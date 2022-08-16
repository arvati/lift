const hardhat = require("hardhat");
const { LedgerSigner } = require("@anders-t/ethers-ledger");

const { expect } = require("chai");

describe("Contract Aula", function () {
  it("Signer same as owner", async function () {

    // ledger polygon 1 : `m/44'/60'/0'/0/0`
    // ledger polygon 2 : `m/44'/60'/1'/0/0`
    const ledger = new LedgerSigner(hardhat.ethers.provider, `m/44'/60'/1'/0/0`);
    const Contract = await hardhat.ethers.getContractFactory("Aula");

    const hardhatContract = await Contract.deploy();

  });
});