import { ethers } from "ethers";
import { createContext } from "react";

function getProvider() {
  if (!global.window?.ethereum) return;
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  return provider;
}

export default createContext(getProvider());
