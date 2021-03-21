import { makeAutoObservable, reaction } from "mobx";

export default class CommonStore {
    token: string | null = window.localStorage.getItem('jwt'); //retrieve token from local storage, if it exists
    appLoaded = false;

    constructor() {
        makeAutoObservable(this)

        //For persistency; if a user is logged in, they will generate a token. 
        //If the token exists on the user's PC, they'll stay logged in while the token exists (ie. doesn't expire or until user logs out)
        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token)
                } else {
                    window.localStorage.removeItem('jwt')
                }
            }
        )
    }

    setToken = (token: string | null) => {
        this.token = token;
    }
}