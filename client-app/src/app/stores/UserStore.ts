import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserCredentials } from "../models/user";
import { store } from "./store";

export default class UserStore {
    user: User | null = null;
    isModalLoginOpen = false;

    constructor() {
        makeAutoObservable(this);
    }

    get IsLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserCredentials) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            this.hideLoginModal();
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
    }

    showLoginModal = () => {
        this.isModalLoginOpen = true;
    }

    hideLoginModal = () => {
        this.isModalLoginOpen = false;
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error); //TODO: error handling
        }
    }
}