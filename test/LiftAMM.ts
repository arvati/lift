import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("LiftAMM", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploy() {   
    const Token = await ethers.getContractFactory("Token");
    const tokenA = await Token.deploy("TokenA", "TKA");
    const tokenB = await Token.deploy("TokenB", "TKB");

    const AMM = await ethers.getContractFactory("LiftAMM");
    const amm = await AMM.deploy(tokenA.address, tokenB.address);

    const [owner] = await ethers.getSigners();

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
      await amm.swap(tokenB.address, amountIn);

      const ammTokenABalance = await tokenA.balanceOf(amm.address);
      const amountOut = amountA.sub(ammTokenABalance).toString();

      expect(amountOut).to.equal("90909090909090910");      
    });
  });
});