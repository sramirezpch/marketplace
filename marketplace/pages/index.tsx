import { ethers } from "ethers";
import type { NextPage } from "next";
import { useEffect } from "react";

import { useAppDispatch } from "../src/hooks/useAppDispatch.hooks";
import { useAppSelector } from "../src/hooks/useAppSelector.hooks";

import { setAccount } from "../src/redux/slices/account.reducer";

import { withProvider } from "../src/interfaces";

const Home: NextPage<withProvider> = ({ provider }) => {
  const account = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  console.log(account);

  useEffect(() => {
    (async () => {
      const [account] = await provider.send("eth_requestAccounts", []);
      const balance = ethers.utils
        .parseEther((await provider.getBalance(account)).toString())
        .toString();

      const transactions = await provider.getTransactionCount(account);

      dispatch(
        setAccount({ address: account as string, balance, transactions })
      );
    })();
  }, []);

  const requestAccount = async () => {
    console.log("Requesting account");
  };

  return (
    <div className="flex justify-between items-center p-3">
      <button className="border-2 px-3 py-1 bg-white" onClick={requestAccount}>
        Connect wallet
      </button>
      <span className="text-black">{account.address}</span>
    </div>
  );
};

export default Home;
