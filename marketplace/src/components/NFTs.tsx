import { Alchemy, OwnedNftsResponse } from "alchemy-sdk";
import React, { useEffect, useState } from "react";

interface INFT {
  alchemy: Alchemy;
  account: string;
}

export default ({ alchemy, account }: INFT) => {
  const [nfts, setNfts] = useState<OwnedNftsResponse>();

  useEffect(() => {
    (async () => {
      const result = await alchemy?.nft.getNftsForOwner(account);
      setNfts(result);
    })();
  }, [account]);
  return nfts && nfts?.totalCount > 0 && <div>NFT!</div>;
};
