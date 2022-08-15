const { ethers } = require("hardhat");

const { expect } = require("chai");


describe("Token contract Seller Tarefa 04", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Tarefa04");

    const hardhatToken = await Token.deploy("0xbfd260ddF1936d3ac0ded8E6D52B9f6E8EC70153");

    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });
});
