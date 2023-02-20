import { useState } from "react";

import { JSONRPCError } from "@/src/interfaces";

export const useError = () => {
  const [errorValue, setErrorValue] = useState<JSONRPCError>({
    error: false,
    action: null,
    errorCode: null,
    errorMessage: null,
    method: null,
  });

  const setError = (error: JSONRPCError) => {
    setErrorValue(error);
  };

  return { error: errorValue, setError };
};
