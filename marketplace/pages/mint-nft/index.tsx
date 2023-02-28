import type { NextPage } from "next";

import NftAbi from "../../src/abi/NFT.json";

import { IWrapped } from "../../src/interfaces";
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
    const tx = await contracts.nft.safeMint(await signer.getAddress(), "");

    await tx.wait();

    const balance = await contracts.nft.balanceOf(await signer.getAddress());
    console.log(balance);
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
