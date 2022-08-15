const hardhat = require("hardhat");
const { LedgerSigner } = require("@anders-t/ethers-ledger");

async function main() {
  // ledger polygon 1 : `m/44'/60'/0'/0/0`
  // ledger polygon 2 : `m/44'/60'/1'/0/0`
  const ledger = new LedgerSigner(hardhat.ethers.provider, `m/44'/60'/1'/0/0`);

  //console.log(ledger);
  //console.log(await hardhat.ethers.provider.getGasPrice());
  //console.log(await hardhat.ethers.provider.getFeeData());
  
  console.log(`Deploying contracts with the account:, ${(await ledger.getAddress())}`);
  console.log(`Account balance:, ${(await ledger.getBalance()).toString()}`);

  //const Token1 = await hardhat.ethers.getContractFactory("Tarefa01");
  //const token1 = await Token1.deploy();

  const Token1 = await hardhat.ethers.getContractFactory("Tarefa01");
  let contractFactory1 = await Token1.connect(ledger);
  const token1 = await contractFactory1.deploy();
  await token1.deployed();

  const Token2 = await hardhat.ethers.getContractFactory("Tarefa02");
  let contractFactory2 = await Token2.connect(ledger);
  const token2 = await contractFactory2.deploy();
  await token2.deployed();

  const Token3 = await hardhat.ethers.getContractFactory("Tarefa03");
  let contractFactory3 = await Token3.connect(ledger);
  const token3 = await contractFactory3.deploy();
  await token3.deployed();

  console.log(`Token address Tarefa 01:, ${token1.address}`);
  console.log(`Token address Tarefa 02:, ${token2.address}`);
  console.log(`Token address Tarefa 03:, ${token3.address}`);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });