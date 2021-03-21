import { createContext, useContext } from "react";
import BloodWorkStore from "./BloodWorkStore";
import CommonStore from "./CommonStore";
import UserStore from "./UserStore";

interface Store {
    bloodWorkStore: BloodWorkStore;
    userStore: UserStore;
    commonStore: CommonStore;
}

export const store: Store = {
    bloodWorkStore: new BloodWorkStore(),
    userStore: new UserStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext)
}