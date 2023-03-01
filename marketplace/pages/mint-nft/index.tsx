import type { NextPage } from "next";
import axios from "axios";

import NftAbi from "../../src/abi/NFT.json";
import contracts from "../../src/contracts.json";

import { IWrapped, PinFilAxiosResponse } from "../../src/interfaces";
import { useContracts } from "../../src/hooks";
import { withProvider } from "../../src/hocs";
import { ethers } from "ethers";

const MintPage: NextPage<IWrapped> = ({ provider }) => {
  const mintNft = async () => {
    let hash = undefined;
    const nft = new ethers.Contract(
      contracts.nft,
      NftAbi.abi,
      provider?.getSigner()
    );
    try {
      const result = await axios.post<PinFilAxiosResponse, any>(
        "http://localhost:8080/pin-file",
        {
          name: "Sergio1",
          lastName: "Ramirez1",
        }
      );

      hash = result.hash;

      const tx = await nft.safeMint(
        await provider?.getSigner().getAddress(),
        `https://gateway.pinata.cloud/ipfs/${hash}`
      );

      console.log(hash);
      await tx.wait();

      console.log(tx);
    } catch (err) {
      if (hash) {
        await axios.delete(`http://localhost:8080/unpin-file/${hash}`);
      }

      console.log(err);
    }
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
