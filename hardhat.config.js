/** @type import('hardhat/config').HardhatUserConfig */

require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-ethers")

require('dotenv').config();

const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const INFURA_KEY = process.env.INFURA_KEY;

module.exports = {
  solidity: "0.8.4",
  networks: {
    matic: {
      url: `https://polygon-mainnet.infura.io/v3/${INFURA_KEY}`,
      accounts: [`0x${WALLET_PRIVATE_KEY}`]
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${INFURA_KEY}`,
      accounts: [`0x${WALLET_PRIVATE_KEY}`]
    }
  },
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
        polygonMumbai: POLYGONSCAN_API_KEY
   }
}
};