import { createSlice } from "@reduxjs/toolkit";
import { ethers } from "ethers";

import type { PayloadAction } from "@reduxjs/toolkit";

export interface ContractState {
  contract: ethers.Contract | undefined;
}

const initialState: ContractState = {
  contract: undefined,
};

export const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<ethers.Contract>) => ({
      ...state,
      contract: action.payload,
    }),
  },
});

export const { update } = contractSlice.actions;

export default contractSlice.reducer;
