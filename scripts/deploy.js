
const hre = require("hardhat");
const { LedgerSigner } = require("@anders-t/ethers-ledger");

const { getContractFactory, getAccount, logger, contructorArgs } = require("./helpers");

async function main() {

    logger(hre, `Network: ${hre.network.name}`);
    const account = await getAccount(hre)
	logger(hre, `Account balance: ${(await account.getBalance()).toString()}`);

    const tokenContractFactory = await getContractFactory(hre.config.contract[1].name, hre, account);
    var token = [];
    for(let i = 0; i < hre.config.contract[1].deploy.length; i++) { 
        var element = hre.config.contract[1].deploy[i]
        tokenArgs = contructorArgs(element.constructor);
        if (element.networks[hre.network.name]){
            tokenContract = await tokenContractFactory.attach(element.networks[hre.network.name]);
            console.log(`Contract ${hre.config.contract[1].name} was already deployed as '${element.constructor.name}' to address: ${tokenContract.address}`);
        } else {
            tokenContract = await tokenContractFactory.deploy( ...tokenArgs, 
                { gasLimit: 10_000_000, gasPrice: ethers.utils.parseUnits('45', 'gwei')});
            await tokenContract.deployed()
            console.log(`Contract ${hre.config.contract[1].name} deployed as '${element.constructor.name}' to address: ${tokenContract.address}`);
        }
        token.push(tokenContract.address);
    };

    const contractFactory = await getContractFactory(hre.config.contract[0].name, hre);
    if (hre.config.contract[0].deploy[0].networks[hre.network.name]) {
        const contract = await tokenContractFactory.attach(hre.config.contract[0].deploy[0].networks[hre.network.name]);
        console.log(`Contract ${hre.config.contract[0].name} was already deployed to address: ${contract.address}`);
    } else {
        let contractArgs = hre.config.contract[0].deploy[0].constructor
        contractArgs.tokenA = token[0]
        contractArgs.tokenB = token[1]
        var args = contructorArgs(contractArgs);
        const contract = await contractFactory.deploy( ...args,  
            { gasLimit: 10_000_000, gasPrice: ethers.utils.parseUnits('45', 'gwei')});
        await contract.deployed()
        console.log(`Contract ${hre.config.contract[0].name} deployed to address: ${contract.address}`);
    }
}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});