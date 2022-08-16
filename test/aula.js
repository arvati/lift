const { ethers } = require("hardhat");

const { expect } = require("chai");

describe("Teste contract Aula", function () {
  it("Owner Fake Test", async function () {
    const [owner] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Aula");

    const hardhatToken = await Token.deploy();

    expect(owner.address).to.equal(owner.address);
  });
});