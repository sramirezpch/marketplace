import type { NextPage } from "next";
import axios from "axios";

import NftAbi from "../../src/abi/NFT.json";
import contracts from "../../src/contracts.json";

import { IWrapped, PinFilAxiosResponse } from "../../src/interfaces";
import { useContracts } from "../../src/hooks";
import { withProvider } from "../../src/hocs";
import { ethers } from "ethers";

const MintPage: NextPage<IWrapped> = ({ provider }) => {
  const pinFileToPinata = async () => {
    try {
      const result = await axios.post<PinFilAxiosResponse, any>(
        "http://localhost:8080/pin-file",
        {
          name: "Sergio1",
          lastName: "Ramirez1",
        }
      );

      return result.hash;
    } catch (err) {
      console.log(err);
    }
  };
  const mint = async (nft: ethers.Contract, hash: string) => {
    try {
      const tx = await nft.safeMint(
        await provider?.getSigner().getAddress(),
        `https://gateway.pinata.cloud/ipfs/${hash}`
      );

      await tx.wait();

      console.log(tx);
    } catch (error) {
      if (hash) {
        await axios.delete(`http://localhost:8080/unpin-file/${hash}`);
      }
      console.log(error);
    }
  };

  const mintNft = async () => {
    const nft = new ethers.Contract(
      contracts.nft,
      NftAbi.abi,
      provider?.getSigner()
    );
    const hash = await pinFileToPinata();
    await mint(nft, hash);
  };

  return (
    <div className="flex flex-col p-3">
      <div>Mint a NFT here</div>
      <div>
        <button onClick={mintNft} className="border-2 px-4 py-1">
          Mint NFT
        </button>
      </div>
    </div>
  );
};

export default withProvider(MintPage);
