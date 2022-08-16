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

  const Contract1 = await hardhat.ethers.getContractFactory("Aula");
  let contractFactory1 = await Contract1.connect(ledger);
  const contract1 = await contractFactory1.deploy();
  await contract1.deployed();

  console.log(`Contract address at:, ${contract1.address}`);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });