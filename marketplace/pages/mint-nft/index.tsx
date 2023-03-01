import type { NextPage } from "next";
import axios from "axios";

import NftAbi from "../../src/abi/NFT.json";

import { IWrapped, PinFilAxiosResponse } from "../../src/interfaces";
import { useContracts } from "../../src/hooks";
import { withProvider } from "../../src/hocs";

const MintPage: NextPage<IWrapped> = ({ provider }) => {
  const { contracts, signer } = useContracts({
    provider,
    nftAbi: JSON.stringify(NftAbi.abi),
  });

  const mintNft = async () => {
    if (!contracts.nft || !signer) {
      console.log({
        nft: contracts.nft === undefined && "NFT contract is undefined",
        signer: signer === undefined && "Signer is undefined",
      });
      return;
    }
    let hash = undefined;

    try {
      const result = await axios.post<PinFilAxiosResponse, any>(
        "http://localhost:8080/pin-file",
        {
          firstName: "Sergio1",
          lastName: "Ramirez1",
        }
      );

      hash = result.hash;

      const tx = await contracts.nft.safeMint(
        await signer.getAddress(),
        `https://gateway.pinata.cloud/ipfs/${hash}`
      );

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
