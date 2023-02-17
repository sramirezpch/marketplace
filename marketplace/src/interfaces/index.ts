import { Alchemy } from "alchemy-sdk";
import { ethers } from "ethers";

export interface IWrapped {
  provider: ethers.BrowserProvider;
  alchemy: Alchemy;
}
