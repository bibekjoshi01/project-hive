import { RootState } from "@/lib/store";

export const authState = (state: RootState) => {
  return state?.auth;
};
