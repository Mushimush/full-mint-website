require("@nomicfoundation/hardhat-toolbox");
const dotenv = require("dotenv")
dotenv.config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_API_URL,
      accounts: [process.env.SEPOLIA_PRIVATE_KEY]
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_PRIVATE_KEY
  }
};
