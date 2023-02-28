import { ethers } from "ethers";
import { Alchemy } from "alchemy-sdk";

export interface IWrapped {
  provider?: ethers.providers.Web3Provider;
  alchemy?: Alchemy;
}
