import { Contract } from "ethers";
import { ethers } from "hardhat";
import path from "path";
import fs from "fs";

async function seed(nft: Contract) {
  const accounts = await ethers.getSigners();

  for (let i = 0; i < 5; i++) {
    await nft.safeMint(accounts[i % 2].address, "");
  }
}

async function main() {
  const network = process.env.HARDHAT_NETWORK;

  let environment: string;

  if (network == "localhost") environment = "development";
  else if (network == "mainnet") environment = "production";
  else environment = "testing";

  const NFT = await ethers.getContractFactory("NFT");
  const nft = await NFT.deploy();

  await nft.deployed();

  const contractAddresses = {
    nft: nft.address,
  };

  const filepath = path.join(
    __dirname,
    `/../package/${environment}-addresses.json`
  );
  const dirname = path.dirname(filepath);

  fs.mkdir(dirname, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    fs.writeFile(filepath, JSON.stringify(contractAddresses), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`${environment} file written successfully`);
    });
  });

  console.log(`NFT contract deployed at ${contractAddresses.nft}`);

  if (environment == "development") await seed(nft);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
