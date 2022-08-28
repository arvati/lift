const { expect } = require("chai");
const hre = require("hardhat");
const { ethers } = hre;
const { time, loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

const { getContractFactory, getAccount } = require("../scripts/helpers");
const { liquidity, isProporcional, getAmountOut } = require("./helpers");

const  contractLiftAmmName = hre.config.contract[0].name;
const  contractTokenName = hre.config.contract[1].name;

it("Testing at hardhat network", async () => {
  expect(hre.network.name).to.equal(hre.config.extra.testNetwork);
});

describe("Lift AMM", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploy() {   
    const Token = await getContractFactory(contractTokenName, hre);
    const {name: nameA, symbol: symbolA} = hre.config.contract[1].deploy[0].constructor
    const tokenA = await Token.deploy(nameA, symbolA);
    const {name: nameB, symbol: symbolB} = hre.config.contract[1].deploy[1].constructor
    const tokenB = await Token.deploy(nameB, symbolB);

    const AMM = await getContractFactory(contractLiftAmmName, hre);
    const fee =  0 // hre.config.contract[0].deploy[0].constructor.fee;
    const {name, symbol} = hre.config.contract[0].deploy[0].constructor
    const amm = await AMM.deploy(name, symbol, tokenA.address, tokenB.address, fee);
    await amm.deployed();

    const owner = await getAccount(hre);

    return { amm, tokenA, tokenB, owner };
  }

  it("Check if Lift AMM was initialized with the correct tokens", async function () {
    const {amm, tokenA, tokenB, owner} = await loadFixture(deploy);
    expect(await amm.tokenA()).to.equal(tokenA.address);
    expect(await amm.tokenB()).to.equal(tokenB.address);
  });

  describe("Liquidity", function () {

    const amountA = ethers.utils.parseEther("1");
    const amountB = ethers.utils.parseEther("10");

    beforeEach(async function () {
      const {amm, tokenA, tokenB, owner} = await loadFixture(deploy);

      await tokenA.approve(amm.address, amountA);
      await tokenB.approve(amm.address, amountB);

      this.currentTest.fixture = {amm, tokenA, tokenB, owner};
    });

    it("Add liquidity", async function () {
      const {amm, tokenA, tokenB, owner} = this.test.fixture;

      // Add liquidity
      await amm.addLiquidity(amountA, amountB);

      //const ammTokenABalance = await tokenA.balanceOf(amm.address);
      //const ammTokenBBalance = await tokenB.balanceOf(amm.address);  
      const {0: ammTokenABalance , 1: ammTokenBBalance} = await amm.getBalances();
      
      const ammLiquidity = await amm.balanceOf(owner.address);

      expect(ammTokenABalance).to.equal(amountA);
      expect(ammTokenBBalance).to.equal(amountB);

      //BigInt("3162277660168379331")
      expect(BigInt(ammLiquidity)).to.equal( liquidity(amountA, amountB) );
    });

    it("Increase wrong liquidity", async function () {
      const {amm, tokenA, tokenB, owner} = this.test.fixture;

      // Add liquidity
      await amm.addLiquidity(amountA, amountB);

      //const ammTokenABalance = await tokenA.balanceOf(amm.address);
      //const ammTokenBBalance = await tokenB.balanceOf(amm.address);  
      const {0: ammTokenABalance , 1: ammTokenBBalance} = await amm.getBalances();
      
      const ammLiquidity = await amm.balanceOf(owner.address);
      expect(ammTokenABalance).to.equal(amountA);
      expect(ammTokenBBalance).to.equal(amountB);

      const amountAA = amountA.add(ethers.utils.parseEther("1"));
      const amountBB = amountB.mul("3");

      expect(isProporcional(amountAA, amountBB, ammTokenABalance, ammTokenBBalance)).to.be.false;
      
      await tokenA.approve(amm.address, amountAA);
      await tokenB.approve(amm.address, amountBB);
      await expect(
        amm.addLiquidity(amountAA, amountBB)
      ).to.be.revertedWith("Wrong proportion between asset A and B");  

    });

    it("Remove liquidity", async function () {
      const {amm, tokenA, tokenB, owner} = this.test.fixture;

      // Add liquidity
      await amm.addLiquidity(amountA, amountB);    
      const liquidity = await amm.balanceOf(owner.address);

      // Remove liquidity
      await amm.removeLiquidity(liquidity);
   
      const {0: ammTokenABalance , 1: ammTokenBBalance} = await amm.getBalances();
      const liquidityAfter = await amm.balanceOf(owner.address);     

      expect(ammTokenABalance).to.equal(0);
      expect(ammTokenBBalance).to.equal(0);
      expect(liquidityAfter).to.equal(0);
    });

    it("Remove partial liquidity", async function () {
      const {amm, tokenA, tokenB, owner} = this.test.fixture;

      // Add liquidity
      await amm.addLiquidity(amountA, amountB);    
      const liquidity = await amm.balanceOf(owner.address);

      // Remove liquidity
      await amm.removeLiquidity(liquidity.div(3));
   
      const {0: ammTokenABalance , 1: ammTokenBBalance} = await amm.getBalances();
      const liquidityAfter = await amm.balanceOf(owner.address);     

      expect(ammTokenABalance).to.equal(amountA.sub(amountA.div(3)));
      expect(ammTokenBBalance).to.equal(amountB.sub(amountB.div(3)));
      expect(liquidityAfter).to.equal(liquidity.sub(liquidity.div(3)));
    });

  });

  describe("Swap", async function (){
    const amountA = ethers.utils.parseEther("1");
    const amountB = ethers.utils.parseEther("10");
    const amountIn = ethers.utils.parseEther("1");

    beforeEach(async function () {
      const {amm, tokenA, tokenB, owner} = await loadFixture(deploy);

      const fee = await amm.fee()

      // Add liquidity
      await tokenA.approve(amm.address, amountA);
      await tokenB.approve(amm.address, amountB);
      await amm.addLiquidity(amountA, amountB);

      const {0:reserveA, 1: reserveB} = await amm.getBalances();

      // Aprove (again?)
      await tokenB.approve(amm.address, amountIn);

      // DeadLine += 1 must be the next call to function
      const deadline = 1 + await time.latest();
      this.currentTest.fixture = {amm, tokenA, tokenB, owner, deadline, fee, reserveA, reserveB};
    });

    it("Basic", async function () {

      const {amm, tokenA, tokenB, owner, deadline, fee, reserveA, reserveB} = this.test.fixture;

      await amm.swap(tokenB.address, amountIn, 0, deadline);

      const {0:ammTokenABalance, 1: ammTokenBBalance} = await amm.getBalances();

      const amountOut = amountA.sub(ammTokenABalance);
      
      //BigInt("90909090909090910")
      expect(amountOut).to.equal(
        getAmountOut(amountIn, reserveB, reserveA, fee)
      );      
    });

    it("With Fee", async function () {

      const {amm, tokenA, tokenB, owner, deadline, fee, reserveA, reserveB} = this.test.fixture;

      await amm.setFee(3); // spend 1 time unit of deadline
      const newFee = await amm.fee()

      await amm.swap(tokenB.address, amountIn, 0, deadline+1);

      const {0:ammTokenABalance, 1: ammTokenBBalance} = await amm.getBalances();

      const amountOut = amountA.sub(ammTokenABalance);
      
      expect(amountOut).to.equal(
        getAmountOut(amountIn, reserveB, reserveA, newFee)
      );      
    });
    
    it("Proteção de slippage (minAmountOut)", async function () {

      const {amm, tokenA, tokenB, owner, deadline} = this.test.fixture;

      await expect(
        amm.swap(tokenB.address, amountIn, ethers.utils.parseUnits("99000", 12), deadline )
      ).to.be.revertedWith("Slippage Protection: Amount less then Minimum requested");  
    });

    it("Proteção de time lock (deadline)", async function () {

      const {amm, tokenA, tokenB, owner, deadline} = this.test.fixture;

      await time.increase(1);

      await expect(
        amm.swap(tokenB.address, amountIn, 0, deadline)
      ).to.be.revertedWith("Time lock protection : deadline greater then timestamp");  
    });    
  });
  
});