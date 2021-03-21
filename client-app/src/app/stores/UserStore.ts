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

    //returns logged in state (if this.user exists true, otherwise false)
    get IsLoggedIn() {
        return !!this.user;
    }

    //given credentials, attempt to log in to that user.
    //If any error occurs (whether credentials are wrong or other db-side error), throw a generic error that is handled by the form.
    login = async (creds: UserCredentials) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            this.hideLoginModal();
            store.bloodWorkStore.loadBloodWorks();
        } catch (error) {
            throw error;
        }
    }

    //Log the user out and delete their token from storage.
    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        store.bloodWorkStore.loadBloodWorks();
    }

    showLoginModal = () => {
        this.isModalLoginOpen = true;
    }

    hideLoginModal = () => {
        this.isModalLoginOpen = false;
    }

    //For persistency. If a token exists, this function will automatically sign them in and load their bloodworks.
    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
            store.bloodWorkStore.loadBloodWorks();
        } catch (error) {
            console.log(error); //TODO: error handling
        }
    }
}