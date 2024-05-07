import { useContext } from "react";
import { StoreContext } from "../store";

export const useStoreContext = () => {
  const store = useContext(StoreContext);

  if (store === undefined) {
    throw new Error("useStoreContext must be used with a StoreContext");
  }

  return store;
};
