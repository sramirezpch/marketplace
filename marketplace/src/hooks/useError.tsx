import { useState } from "react";

export const useError = () => {
  const [errorValue, setErrorValue] = useState<string>();

  const setError = (error: string) => {
    setError(error);
  };

  return { error: errorValue, setError };
};
