import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const { PRIVATE_KEY, API_URL } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  defaultNetwork: "volta",
  networks: {
    hardhat: {},
    volta: {
      url: `${API_URL}`,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};

export default config;
