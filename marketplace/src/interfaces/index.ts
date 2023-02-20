import { Alchemy } from "alchemy-sdk";
import { ethers } from "ethers";

export interface IWrapped {
  provider: ethers.BrowserProvider;
  alchemy: Alchemy;
}

export interface JSONRPCError {
  error: boolean;
  errorCode: number | null;
  action: string | null;
  errorMessage: string | null;
  method: string | null;
}
