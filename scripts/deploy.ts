import { ethers, network } from "hardhat";
import dotenv from "dotenv";
dotenv.config();

const { PUBLIC_KEY } = process.env;

async function main() {
  if (!PUBLIC_KEY) {
    throw new Error("Please set the PRIVATE_KEY environment variable.");
  }

  const ContractFactory = await ethers.getContractFactory("productApi");
  const owner = await ethers.getSigner(PUBLIC_KEY);
  const contract = await ContractFactory.connect(owner).deploy();

  await contract.deployed();

  console.log("Contract Address:", contract.address);
  console.log("Contract Owner:", owner);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
