"use client";

import { FC, useState, useEffect } from "react";
import { ethers } from "ethers";

import { withProvider } from "@/src/hoc/withProvider";
import { IWrapped } from "@/src/interfaces";
import NFTs from "@/src/components/NFTs";
import { useError } from "@/src/hooks";

const HomePage: FC<IWrapped> = ({ provider, alchemy }) => {
  const [account, setAccount] = useState<string>();
  const [balance, setBalance] = useState<string>();
  const [network, setNetwork] = useState<string>();
  const [nfts, setNfts] = useState();

  const { error, setError } = useError();

  const requestAccount = async () => {
    try {
      await provider?.send("eth_requestAccounts", []);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      if (!provider) {
        console.log("NO PROVIDER");
        return;
      }
      const signer = await provider?.getSigner();
      const balance = await provider?.getBalance(await signer.getAddress());
      const network = await provider.getNetwork();

      setAccount(await signer.getAddress());
      setBalance(ethers.formatEther(balance));
      setNetwork(network.chainId.toString());
    })();
  }, [provider]);

  return (
    <div>
      <button onClick={requestAccount}>Connect wallet</button>
      {account ? (
        <>
          <div>Wallet address: {account && account}</div>
          <div>Balance: {balance && balance}</div>
          <div>Network: {network && network}</div>
          <NFTs alchemy={alchemy} account={account!} />
        </>
      ) : null}
    </div>
  );
};

export default withProvider(HomePage);
