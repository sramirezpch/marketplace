"use client";

import { FC, useState, useEffect } from "react";
import { ethers } from "ethers";

import { withProvider } from "@/src/hoc/withProvider";
import { IWrapped } from "@/src/interfaces";

const HomePage: FC<IWrapped> = ({ provider }) => {
  const [account, setAccount] = useState<string>();
  const [balance, setBalance] = useState<string>();
  const [network, setNetwork] = useState<string>();

  useEffect(() => {
    (async () => {
      if (!provider) return;
      const signer = await provider?.getSigner();
      const balance = await provider?.getBalance(await signer.getAddress());
      const network = await provider.getNetwork();

      console.log(network);
      setAccount(await signer.getAddress());
      setBalance(ethers.formatEther(balance));
      setNetwork(network.chainId.toString());
    })();
  }, [provider]);

  return (
    <div>
      <button>Connect wallet</button>
      <div>Wallet address: {account && account}</div>
      <div>Balance: {balance && balance}</div>
      <div>Network: {network && network}</div>
    </div>
  );
};

export default withProvider(HomePage);
