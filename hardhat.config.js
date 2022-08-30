/** @type import('hardhat/config').HardhatUserConfig */

require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-chai-matchers");
require("@cronos-labs/hardhat-cronoscan");

require('dotenv').config();

// Hardhat custom tasks
require("./scripts/deploy_task.js");

const { WALLET_PRIVATE_KEY } = process.env;
const { POLYGONSCAN_API_KEY, BSCSCAN_API_KEY, HARMONY_API_KEY, CRONOSCAN_API_KEY, ETHERSCAN_API_KEY } = process.env;
const { INFURA_KEY, ALCHEMY_KEY, MATICVIGIL_KEY } = process.env;

module.exports = {
  solidity: {
    version: "0.8.9",
      settings: {
        optimizer: {
          enabled: true,
          runs: 1
        }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000,
    failZero: true,
    bail: true,
    forbidOnly: true,
    forbidPending: true
  },
  defaultNetwork: "polygon",
  networks: {
    hardhat: {
    },
    polygon: {
      //url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`
      //url: `https://polygon-mainnet.infura.io/v3/${INFURA_KEY}`,
      //url: "https://polygon-rpc.com",
      url: `https://rpc-mainnet.maticvigil.com/v1/${MATICVIGIL_KEY}`,
      chainId: 137,
      gasMultiplier: 10,
      gasPrice: 35000000000,
      gasLimit: 300000,
      accounts: [WALLET_PRIVATE_KEY]
    },
    polygonMumbai: {
      //url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_KEY}`
      //url: `https://polygon-mumbai.infura.io/v3/${INFURA_KEY}`,
      url: `https://rpc-mumbai.maticvigil.com/v1/${MATICVIGIL_KEY}`,
      chainId: 80001,
      gasMultiplier: 10,
      gasPrice: 35000000000,
      gasLimit: 300000,
      accounts: [WALLET_PRIVATE_KEY]
    },
    harmonyTest: {
      url: "https://api.s0.b.hmny.io",
      chainId: 1666700000,
      accounts: [WALLET_PRIVATE_KEY]
    },
    harmony: {
      url: "https://api.harmony.one",
      chainId: 1666600000,
      accounts: [WALLET_PRIVATE_KEY]
    },
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      accounts: [WALLET_PRIVATE_KEY]
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org",
      chainId: 56,
      accounts: [WALLET_PRIVATE_KEY]
    },
    cronosTestnet: {
      url: "https://evm-t3.cronos.org/",
      chainId: 338,
      accounts: [WALLET_PRIVATE_KEY],
      gasPrice: 5000000000000,
    },
    cronos: {
      url: "https://evm.cronos.org/",
      chainId: 25,
      accounts: [WALLET_PRIVATE_KEY],
      gasPrice: 5000000000000,
    },
  },
  // npx hardhat verify --list-networks
  etherscan: {
    apiKey: {
        //ethereum
        mainnet: ETHERSCAN_API_KEY,
        ropsten: ETHERSCAN_API_KEY,
        rinkeby: ETHERSCAN_API_KEY,
        goerli: ETHERSCAN_API_KEY,
        kovan: ETHERSCAN_API_KEY,
        //polygon
        polygon: POLYGONSCAN_API_KEY,
        polygonMumbai: POLYGONSCAN_API_KEY,
        // binance smart chain
        bsc: BSCSCAN_API_KEY,
        bscTestnet: BSCSCAN_API_KEY,
        // harmony
        harmony: HARMONY_API_KEY,
        harmonyTest: HARMONY_API_KEY,
        // cronos
        cronos: CRONOSCAN_API_KEY,
        cronosTestnet: CRONOSCAN_API_KEY,
   }
  },
  ledger: {
    path: 1,
    connect : true 
  },
  extra: {
    log: true,
    testNetwork: "hardhat"
  },
  contract: [
    { name: "LiftAMM",
      deploy: [ {
        constructor: {
          name: "Lift aula 7 - AMM",
          symbol: "LiftAMM",
          tokenA: "0xFf95A425ee5069e6a17761567e943DFb6F2B2F82",
          tokenB: "0x28c4E5d0a4E34a19756333f191d70bED3E7c89e1",
          fee: 3
        },
        networks: {
          polygon: "",
          polygonMumbai: "0xECe7C80215c3BC0906e1b83b979B5e835ade322f"
        }
      },
      ]
    },
    { name: "Token",
      deploy: [ {
        constructor: {
          name: "Token A",
          symbol: "A",
        },
        networks: {
          polygon: "",
          polygonMumbai: "0xFf95A425ee5069e6a17761567e943DFb6F2B2F82"
        }
      }, {
        constructor: {
          name: "Token B",
          symbol: "B",
        },
        networks: {
          polygon: "",
          polygonMumbai: "0x28c4E5d0a4E34a19756333f191d70bED3E7c89e1"
        }
      }
      ]
    },
  ]
};