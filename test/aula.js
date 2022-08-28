const { expect } = require("chai");
const hre = require("hardhat");
const { ethers } = hre;
const { time, loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

const { getContractFactory, getAccount } = require("../scripts/helpers");

const  contractLiftAmmName = hre.config.contract[0].name;
const  contractTokenName = hre.config.contract[1].name;

it("Testing at hardhat network", async () => {
  expect(hre.network.name).to.equal("hardhat");
});

describe("LiftAMM", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploy() {   
    const Token = await getContractFactory(contractTokenName, hre);
    const tokenA = await Token.deploy(hre.config.contract[1].deploy[0].constructor.name, hre.config.contract[1].deploy[0].constructor.symbol);
    const tokenB = await Token.deploy(hre.config.contract[1].deploy[1].constructor.name, hre.config.contract[1].deploy[1].constructor.symbol);

    const AMM = await getContractFactory(contractLiftAmmName, hre);
    const amm = await AMM.deploy(tokenA.address, tokenB.address);
    await amm.deployed();

    const owner = await getAccount(hre);

    return { amm, tokenA, tokenB, owner };
  }

  describe("Lift AMM tests", function () {
    it("Check if Lift AMM was initialized with the correct tokens", async function () {
      const { amm, tokenA, tokenB } = await loadFixture(deploy);

      expect(await amm.tokenA()).to.equal(tokenA.address);
      expect(await amm.tokenB()).to.equal(tokenB.address);
    });

    it("Add liquidity", async function () {
      const { amm, tokenA, tokenB, owner } = await loadFixture(deploy);

      // Add liquidity

      const amountA = ethers.utils.parseEther("1");
      const amountB = ethers.utils.parseEther("10");

      await tokenA.approve(amm.address, amountA);
      await tokenB.approve(amm.address, amountB);

      await amm.addLiquidity(amountA, amountB);

      const ammTokenABalance = await tokenA.balanceOf(amm.address);
      const ammTokenBBalance = await tokenB.balanceOf(amm.address);  
      
      const liquidity = await amm.balance(owner.address);

      expect(ammTokenABalance).to.equal(amountA);
      expect(ammTokenBBalance).to.equal(amountB);
      expect(liquidity.toString()).to.equal("3162277660168379331");
    });

   
    it("Remove liquidity", async function () {
      const { amm, tokenA, tokenB, owner } = await loadFixture(deploy);

      // Add liquidity

      const amountA = ethers.utils.parseEther("1");
      const amountB = ethers.utils.parseEther("10");

      await tokenA.approve(amm.address, amountA);
      await tokenB.approve(amm.address, amountB);
      await amm.addLiquidity(amountA, amountB);    
      const liquidity = await amm.balance(owner.address);

      // Remove liquidity

      await amm.removeLiquidity(liquidity);

      const ammTokenABalance = await tokenA.balanceOf(amm.address);
      const ammTokenBBalance = await tokenB.balanceOf(amm.address);   
      const liquidityAfter = await amm.balance(owner.address);     

      expect(ammTokenABalance).to.equal(0);
      expect(ammTokenBBalance).to.equal(0);
      expect(liquidityAfter).to.equal(0);
    });

    it("Swap", async function () {
      const { amm, tokenA, tokenB, owner } = await loadFixture(deploy);

      // Add liquidity
      const amountA = ethers.utils.parseEther("1");
      const amountB = ethers.utils.parseEther("10");

      await tokenA.approve(amm.address, amountA);
      await tokenB.approve(amm.address, amountB);
      await amm.addLiquidity(amountA, amountB);  
      
      // Swap
      
      const amountIn = ethers.utils.parseEther("1");
      await tokenB.approve(amm.address, amountIn);
      await amm.swap(tokenB.address, amountIn, 0);

      const ammTokenABalance = await tokenA.balanceOf(amm.address);
      const amountOut = amountA.sub(ammTokenABalance).toString();

      expect(amountOut).to.equal("90909090909090910");      
    });

    it("Proteção de slippage (minAmountOut)", async function () {
      const { amm, tokenA, tokenB, owner } = await loadFixture(deploy);

      // Add liquidity
      const amountA = ethers.utils.parseEther("1");
      const amountB = ethers.utils.parseEther("10");

      await tokenA.approve(amm.address, amountA);
      await tokenB.approve(amm.address, amountB);
      await amm.addLiquidity(amountA, amountB);  
      
      // Swap
      
      const amountIn = ethers.utils.parseEther("1");
      await tokenB.approve(amm.address, amountIn);

      await expect(
        amm.swap(tokenB.address, amountIn, ethers.utils.parseUnits("99000", 12) )
      ).to.be.revertedWith("Slippage Protection: Amount less then Minimum requested");  
    });

  });
});