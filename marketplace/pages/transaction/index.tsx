import type { NextPage } from "next";
import { useRef } from "react";

const TransactionPage: NextPage = () => {
  const amountRef = useRef();
  const walletAddressRef = useRef();

  const executeTransaction = () => {
    console.log("Executing transaction");
  };
  return (
    <div className="w-full flex">
      <div className="flex flex-col p-3 mx-auto bg-slate-500 gap-y-5 rounded-xl">
        <label>
          <span>Type the amount in ETH to send</span>
          <input className="border-2 px-1 w-full" ref={amountRef.current} />
        </label>
        <label>
          <span>Paste the wallet address to send the ETH</span>
          <input
            className="border-2 px-1 w-full"
            ref={walletAddressRef.current}
          />
        </label>
        <button
          className="border-2 rounded-lg bg-white"
          onClick={executeTransaction}
        >
          Send ETH
        </button>
      </div>
    </div>
  );
};

export default TransactionPage;
