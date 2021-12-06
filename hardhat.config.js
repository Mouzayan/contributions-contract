require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: './src/srtifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    }
  }
};
