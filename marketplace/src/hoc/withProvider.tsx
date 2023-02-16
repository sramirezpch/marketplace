"use client";

import { useState, useEffect, FC } from "react";

import { ethers } from "ethers";
import { IWrapped } from "../interfaces";

export const withProvider = (WrappedComponent: FC<IWrapped>) => {
  const EnhancedComponent: FC = (props) => {
    const [provider, setProvider] = useState<ethers.BrowserProvider>();

    useEffect(() => {
      if (!window.ethereum) {
        alert("Metamask is not installed!");
        return;
      }
      const prov = new ethers.BrowserProvider(window.ethereum);
      setProvider(prov);
    }, []);
    return <WrappedComponent {...props} provider={provider!} />;
  };

  return EnhancedComponent;
};
