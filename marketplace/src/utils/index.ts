import { JSONRPCError } from "@/src/interfaces";

export const parseRPCError = (error: string): JSONRPCError => {
  const {
    action,
    code: errorMessage,
    info: {
      error: { code },
      payload: { method },
    },
  } = JSON.parse(JSON.stringify(error));

  return {
    error: true,
    errorCode: code,
    errorMessage,
    action: action,
    method: method,
  };
};
