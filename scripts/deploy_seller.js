const hardhat = require("hardhat");
const { LedgerSigner } = require("@anders-t/ethers-ledger");

async function main() {
  // ledger polygon 1 : `m/44'/60'/0'/0/0`
  // ledger polygon 2 : `m/44'/60'/1'/0/0`
  const ledger = new LedgerSigner(hardhat.ethers.provider, `m/44'/60'/1'/0/0`);

  console.log(`Deploying contracts with the account:, ${(await ledger.getAddress())}`);
  console.log(`Account balance:, ${(await ledger.getBalance()).toString()}`);

  //const Token5 = await ethers.getContractFactory("Tarefa04");
  //const token5 = await Token5.deploy("0x86fcF8f5815f36F771eE2140Beb4fe87206cde59");

  const Contract4 = await hardhat.ethers.getContractFactory("Tarefa04");
  let contractFactory4 = await Contract4.connect(ledger);
  const contract4 = await contractFactory4.deploy("0x86fcF8f5815f36F771eE2140Beb4fe87206cde59");
  await contract4.deployed();

  console.log(`Token address Seller Tarefa 04:, ${contract4.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });