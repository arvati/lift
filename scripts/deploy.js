const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(`Deploying contracts with the account:, ${deployer.address}`);

  console.log(`Account balance:, ${(await deployer.getBalance()).toString()}`);

  const Token1 = await ethers.getContractFactory("Tarefa01");
  const token1 = await Token1.deploy();

  const Token2 = await ethers.getContractFactory("Tarefa02");
  const token2 = await Token2.deploy();

  const Token3 = await ethers.getContractFactory("Tarefa03");
  const token3 = await Token3.deploy();

  const Token4 = await ethers.getContractFactory("Tarefa04");
  const token4 = await Token4.deploy();

  console.log(`Token address Tarefa 01:, ${token1.address}`);
  console.log(`Token address Tarefa 02:, ${token2.address}`);
  console.log(`Token address Tarefa 03:, ${token3.address}`);
  console.log(`Token address Tarefa 04:, ${token4.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });