import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    localhost: {},
  },
  paths: {
    artifacts: "./build",
  },
};

export default config;
