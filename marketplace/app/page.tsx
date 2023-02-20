"use client";

import { FC, useState, useEffect } from "react";
import { ethers } from "ethers";

import { withProvider } from "@/src/hoc";
import { IWrapped } from "@/src/interfaces";
import { useError } from "@/src/hooks";
import { parseRPCError } from "@/src/utils";
import { AccountInfo } from "@/src/components/AccountInfo";

const HomePage: FC<IWrapped> = ({ provider, alchemy }) => {
  const [account, setAccount] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const [network, setNetwork] = useState<string>("");

  const { error, setError } = useError();

  const requestAccount = async () => {
    try {
      const signer = await provider?.getSigner();
      const balance = await provider?.getBalance(await signer.getAddress());
      const network = await provider.getNetwork();

      setAccount(await signer.getAddress());
      setBalance(ethers.formatEther(balance));
      setNetwork(network.chainId.toString());
    } catch (error: any) {
      const parsedError = parseRPCError(error);
      setError(parsedError);
    }
  };

  useEffect(() => {
    (async () => {
      if (!provider) return;
      await requestAccount();
    })();
  }, [provider]);

  return (
    <div>
      <button onClick={requestAccount}>Connect wallet</button>
      {account ? (
        <AccountInfo
          account={account}
          balance={balance}
          network={network}
          alchemy={alchemy}
        />
      ) : (
        <div>{error!.errorMessage}</div>
      )}
    </div>
  );
};

export default withProvider(HomePage);
