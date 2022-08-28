const { getContractFactory, getAccount } = require("./helpers");

task("check-balance", "Prints out the balance of your account").setAction(async function (taskArguments, hre) {
	const account = await getAccount(hre)
	console.log(`Account balance: ${(await account.getBalance()).toString()}`);
});

task("deploy", "Deploys the aula.sol contract").setAction(async function (taskArguments, hre) {
	console.log(`Network: ${hre.network.name}`);
	const contractFactory = await getContractFactory(hre.config.contract[0].name, hre);
	const { tokenA, tokenB, fee } = hre.config.contract[0].deploy[0].constructor;
	const contract = await contractFactory.deploy( tokenA, tokenB, fee,  
		{ gasLimit: 10_000_000, gasPrice: ethers.utils.parseUnits('45', 'gwei')});
	await contract.deployed()
	console.log(`Contract LiftAMM deployed to address: ${contract.address}`);
});

task("deployA", "Deploys the token.sol contract - tokenA ").setAction(async function (taskArguments, hre) {
	console.log(`Network: ${hre.network.name}`);
	const contractFactory = await getContractFactory(hre.config.contract[1].name, hre);
	const { name, symbol } = hre.config.contract[1].deploy[0].constructor;
	const contract = await contractFactory.deploy( name, symbol, 
		{ gasLimit: 10_000_000, gasPrice: ethers.utils.parseUnits('45', 'gwei')});
	await contract.deployed()
	console.log(`Contract tokenA deployed to address: ${contract.address}`);
});

task("deployB", "Deploys the token.sol contract - tokenA ").setAction(async function (taskArguments, hre) {
	console.log(`Network: ${hre.network.name}`);
	const contractFactory = await getLedgerContractFactory(hre.config.contract[1].name, hre);
	const { name, symbol } = hre.config.contract[1].deploy[1].constructor;
	const contract = await contractFactory.deploy( name, symbol, 
		{ gasLimit: 10_000_000, gasPrice: ethers.utils.parseUnits('45', 'gwei')});
	await contract.deployed()
	console.log(`Contract tokenB deployed to address: ${contract.address}`);
});