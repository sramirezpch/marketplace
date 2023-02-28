import { ethers } from "ethers";

export interface withProvider {
  provider: ethers.providers.Web3Provider;
}
