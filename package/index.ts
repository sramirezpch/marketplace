import nftJson from "./NFT.json";
import developmentAddresses from "./testing-addresses.json";

const abi = {
  nft: {
    name: nftJson.contractName,
    abi: nftJson.abi,
  },
};

const addresses = {
  development: {
    nft: developmentAddresses.nft,
  },
};

export { abi, addresses };
