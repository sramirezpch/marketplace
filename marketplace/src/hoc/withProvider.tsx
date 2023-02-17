"use client";

import { useState, useEffect, FC } from "react";

import { ethers } from "ethers";
import { Alchemy, Network } from "alchemy-sdk";

import { IWrapped } from "../interfaces";

export const withProvider = (WrappedComponent: FC<IWrapped>) => {
  const EnhancedComponent: FC = (props) => {
    const [provider, setProvider] = useState<ethers.BrowserProvider>();
    const [alchemy, setAlchemy] = useState<Alchemy>();

    function createAlchemy() {
      const config = {
        apiKey: process.env.ALCHEMY_API_KEY,
        network: Network.ETH_GOERLI,
      };

      const alchemy = new Alchemy(config);

      return alchemy;
    }

    useEffect(() => {
      if (!window.ethereum) {
        alert("Metamask is not installed!");
        return;
      }

      const alch = createAlchemy();
      const prov = new ethers.BrowserProvider(window.ethereum);

      setProvider(prov);
      setAlchemy(alch);
    }, []);

    return (
      <WrappedComponent {...props} provider={provider!} alchemy={alchemy!} />
    );
  };

  return EnhancedComponent;
};
