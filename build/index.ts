import NftJson from "./contracts/NFT.sol/NFT.json";
import localAddresses from "./testing-addresses.json";

const smartContractsAbi = {
  nft: NftJson.abi,
};

const smartContractsAddresses = {
  development: {
    nft: localAddresses.nft,
  },
};

export { smartContractsAbi, smartContractsAddresses };
