import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

import "./tasks/accounts";
import "./tasks/clean";
import "./tasks/deploy";

import { resolve } from "path";


import { config as dotenvConfig } from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import { NetworkUserConfig } from "hardhat/types";

dotenvConfig({ path: resolve(__dirname, "./.env") });

const chainIds = {
  goerli: 5,
  hardhat: 31337,
  kovan: 42,
  mainnet: 1,
  eosevm: 15556,
  polygon: 137,
  mumbai: 80001,
};

// Ensure that we have all the environment variables we need.
const PRIVATE_KEY: string | undefined = process.env.PRIVATE_KEY;
if (!PRIVATE_KEY) {
  throw new Error("Please set your PRIVATE_KEY in a .env file");
}

function getChainConfig(network: keyof typeof chainIds): NetworkUserConfig {
  const url: string = "https://api-testnet.trust.one";
  return {
    accounts: [`0x${PRIVATE_KEY}`]
,
    chainId: chainIds[network],
    url,
  };
}

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  gasReporter: {
    currency: "USD",
    enabled: process.env.REPORT_GAS ? true : false,
    excludeContracts: [],
    src: "./contracts",
  },
  networks: {
    hardhat: {
      chainId: chainIds.hardhat,
    },
    goerli: getChainConfig("goerli"),
    kovan: getChainConfig("kovan"),
    eosevm: getChainConfig("eosevm"),
    polygon: getChainConfig("polygon"),
    mumbai: getChainConfig("mumbai"),
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.7",
    settings: {
      metadata: {
        // Not including the metadata hash
        // https://github.com/paulrberg/solidity-template/issues/31
        bytecodeHash: "none",
      },
      // Disable the optimizer when debugging
      // https://hardhat.org/hardhat-network/#solidity-optimizer-support
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
};

export default config;
