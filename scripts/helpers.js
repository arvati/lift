//const { LedgerSigner } = require("@ethersproject/hardware-wallets");
const { LedgerSigner } = require("@anders-t/ethers-ledger");

// Helper method for fetching environment variables from .env
function getEnvVariable(key, defaultValue) {
	if (process.env[key]) {
		return process.env[key];
	}
	if (!defaultValue) {
		throw `${key} is not defined and no default value was provided`;
	}
	return defaultValue;
}

// Helper method for fetching a wallet account using an environment variable for the PK
async function getAccount(hre) {
    if (!hre.config.ledger.connect || hre.network.name == "hardhat") {
        const [hardhatSigner] = await ethers.getSigners();
        log(hre, `Using account: ${hardhatSigner.address}`);
        return hardhatSigner
    } else {
        // ledger polygon 1 : `m/44'/60'/0'/0/0`
        // ledger polygon 2 : `m/44'/60'/1'/0/0`
        const ledgerSigner = new LedgerSigner(await ethers.provider, `m/44'/60'/${(hre.config.ledger.path)}'/0/0`);
        log(hre, `Using Ledger account: ${(await ledgerSigner.getAddress())}`);
        return ledgerSigner
    }
}

function log(hre, msg) {
    if (hre.config.extra.log) console.log(msg);
}

async function getContractFactory(contractName, hre, _signer) {
    const signer = (typeof _signer !== 'undefined') ? _signer : await getAccount(hre);
    const myContractFactory = await ethers.getContractFactory(contractName);
    log(hre, `Using contract: ${contractName}`);
    return await myContractFactory.connect(signer);
}

async function getContract(contractName, contractAddress, hre, _signer) {
    const signer = (typeof _signer !== 'undefined') ? _signer : await getAccount(hre);
    let myContract = await getContractFactory(contractName, hre, signer);
    log(hre,`Using contract address: ${contractAddress}`);
    return myContract.attach(contractAddress);
}

function contructorArgs(constructor) {
    var args = [];
    for (const arg in constructor) {
        if (constructor.hasOwnProperty(arg)) args.push(constructor[arg]);
    }
    return args;
}


module.exports = {
	getEnvVariable,
	getAccount,
    getContractFactory,
	getContract,
    logger : log,
    contructorArgs
}