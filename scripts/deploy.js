const hre = require("hardhat");
const { LedgerSigner } = require("@anders-t/ethers-ledger");

const { getContractFactory, getAccount, logger, contructorArgs } = require("./helpers");


async function main() {

  logger(hre, `Network: ${hre.network.name}`);
  const account = await getAccount(hre)
  logger(hre, `Account balance: ${(await account.getBalance()).toString()}`);

  var token = [];
  for(let i = 0; i < 4; i++) { 
    let tokenContractFactory = await getContractFactory(hre.config.contract[i].name, hre, account);
    var element = hre.config.contract[i].deploy[0]
    tokenArgs = (!element.constructor) ? [] : contructorArgs(element.constructor);
    if (i==3) {
      tokenArgs[0] = token[0] ; 
      console.log(`Using token at address: ${token[0]}`)
    }
    if (element.networks[hre.network.name]){
        tokenContract = await tokenContractFactory.attach(element.networks[hre.network.name]);
        console.log(`Contract ${hre.config.contract[i].name} was already deployed to address: ${tokenContract.address}`);
    } else {
        tokenContract = await tokenContractFactory.deploy( ...tokenArgs, 
            { gasLimit: 10_000_000, gasPrice: ethers.utils.parseUnits('45', 'gwei')});
        await tokenContract.deployed()
        console.log(`Contract ${hre.config.contract[i].name} deployed to address: ${tokenContract.address}`);
    }
    token.push(tokenContract.address);
  };
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });