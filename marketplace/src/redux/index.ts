import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/account.reducer";

import contractReducer from "./slices/contract.reducer";

export const store = configureStore({
  reducer: {
    contract: contractReducer,
    account: accountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
