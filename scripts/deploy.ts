import path from "path";
import fs from "fs";

import { artifacts, ethers } from "hardhat";

async function main() {
  const contractsDir = path.join(__dirname, "/../marketplace/src");

  const NFT = await ethers.getContractFactory("NFT");
  const nft = await NFT.deploy();

  await nft.deployed();

  const contractAddresses = {
    nft: nft.address,
  };

  console.log(`NFT contract deployed at ${contractAddresses.nft}`);

  fs.writeFileSync(
    `${contractsDir}\\contracts.json`,
    JSON.stringify(contractAddresses)
  );

  const NFTArtifact = artifacts.readArtifactSync("NFT");

  fs.writeFileSync(
    `${contractsDir}\\abi\\NFT.json`,
    JSON.stringify(NFTArtifact)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
