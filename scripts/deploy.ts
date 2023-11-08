import { ethers } from "hardhat";

async function main() {
  

  const ContractFactory = await ethers.getContractFactory("productApi");
  const contract = await ContractFactory.deploy();


  await contract.waitForDeployment();

  const address = await contract.getAddress();

  console.log(
    "Contract Address:", address
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
