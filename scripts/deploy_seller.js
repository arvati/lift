const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(`Deploying contracts with the account:, ${deployer.address}`);

  console.log(`Account balance:, ${(await deployer.getBalance()).toString()}`);

  const Token5 = await ethers.getContractFactory("Tarefa04");
  const token5 = await Token5.deploy("0xbfd260ddF1936d3ac0ded8E6D52B9f6E8EC70153");

  console.log(`Token address Seller Tarefa 04:, ${token5.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });