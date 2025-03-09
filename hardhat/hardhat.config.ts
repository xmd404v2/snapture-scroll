import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import dotenv from 'dotenv';
dotenv.config();

const config: HardhatUserConfig = {
  solidity: '0.8.27',
  networks: {
    hardhat: {
      chainId: 1337,
    },
    gnosisChiado: {
      url: 'https://rpc.chiado.gnosis.gateway.fm',
      chainId: 10200,
      accounts: [process.env.DEPLOYER_PK],
    },
    morphTestnet: {
      url: 'https://rpc-holesky.morphl2.io',
      chainId: 2810,
      accounts: [process.env.DEPLOYER_PK],
    },
    scrollSepolia: {
      url: 'https://sepolia-rpc.scroll.io',
      chainId: 534351,
      accounts: [process.env.DEPLOYER_PK],
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.DEPLOYER_PK ?? ''],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    customChains: [
      {
        network: 'gnosisChiado',
        chainId: 10200,
        urls: {
          apiURL: 'https://gnosis-chiado.blockscout.com/api/',
          browserURL: 'https://gnosis-chiado.blockscout.com/',
        },
      },
      {
        network: 'morphTestnet',
        chainId: 2810,
        urls: {
          apiURL: 'https://explorer-api-holesky.morphl2.io/api/',
          browserURL: 'https://explorer-holesky.morphl2.io/',
        },
      },
    ],
  },
};

export default config;
