import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("NFT contract", () => {
  async function deployNFTContractFixture() {
    const [owner, ...otherAccounts] = await ethers.getSigners();

    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy();

    return { nft, owner, otherAccounts };
  }

  describe("Deployment", async () => {
    it("should deploy with the correct name and symbol", async () => {
      const { nft } = await loadFixture(deployNFTContractFixture);

      expect(await nft.name()).to.be.equal("NFT");
      expect(await nft.symbol()).to.be.equal("MKP");
    });

    it("should mint a new NFT", async () => {
      const { nft, otherAccounts } = await loadFixture(
        deployNFTContractFixture
      );

      const price = ethers.utils.parseUnits("0.02", "ether");

      await expect(nft.safeMint(otherAccounts[1].address, "", { value: price }))
        .to.not.be.reverted;
    });
  });
});
