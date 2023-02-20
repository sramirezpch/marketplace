import { FC, ReactElement } from "react";

import { Alchemy } from "alchemy-sdk";

import NFTs from "./NFTs";

interface IAccountInfo {
  account: string;
  balance: string;
  network: string;
  alchemy: Alchemy;
}

export const AccountInfo: FC<IAccountInfo> = ({
  account,
  balance,
  network,
  alchemy,
}) => {
  return (
    <>
      <div>Wallet address: {account && account}</div>
      <div>Balance: {balance && balance}</div>
      <div>Network: {network && network}</div>
      <NFTs alchemy={alchemy} account={account!} />
    </>
  );
};
