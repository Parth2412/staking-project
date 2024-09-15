require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const POLYGON_API_KEY = process.env.POLYGON_API_KEY;

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
      },
    ],
  },
  networks: {
    amoy: {
      url: "https://polygon-amoy-bor-rpc.publicnode.com",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: POLYGON_API_KEY,
  },
};
