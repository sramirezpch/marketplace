import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

interface AccountState {
  address?: string;
  balance?: string;
  transactions?: number;
}

const initialState: AccountState = {
  address: undefined,
  balance: undefined,
  transactions: undefined,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<AccountState>) => {
      const { payload } = action;
      return {
        ...state,
        address: payload.address,
        balance: payload.balance,
        transactions: payload.transactions,
      };
    },
  },
});

export const { setAccount } = accountSlice.actions;

export default accountSlice.reducer;
