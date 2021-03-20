import { createContext, useContext } from "react";
import BloodWorkStore from "./BloodWorkStore";

interface Store {
    bloodWorkStore: BloodWorkStore
}

export const store: Store = {
    bloodWorkStore: new BloodWorkStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext)
}