"use client";
import { FC, useRef } from "react";
import { ethers } from "ethers";

import { withProvider } from "@/src/hoc/withProvider";
import { IWrapped } from "@/src/interfaces";

const TransactionPage: FC<IWrapped> = ({ provider }) => {
  const amountRef = useRef<HTMLInputElement>(null);
  const walletAddressRef = useRef<HTMLInputElement>(null);

  const executeTransaction = async () => {
    const signer = await provider.getSigner();

    const tx = await signer.sendTransaction({
      to: walletAddressRef.current!.value,
      value: ethers.parseEther(amountRef.current!.value),
    });

    const receipt = await tx.wait();

    console.log("From: ", receipt?.from);
    console.log("To: ", receipt?.to);
    console.log("Fee: ", receipt?.fee);
  };
  return (
    <div>
      <label>
        <span>Type the amount in ETH to send</span>
        <br />
        <input ref={amountRef} />
      </label>
      <br />
      <label>
        <span>Insert the wallet address to send the ETH from your account</span>
        <br />
        <input ref={walletAddressRef} />
      </label>
      <br />
      <button onClick={executeTransaction}>Send ETH</button>
    </div>
  );
};

export default withProvider(TransactionPage);
