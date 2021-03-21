import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { BloodWork } from "../models/bloodWork";
import {v4 as uuid} from 'uuid';
import { store } from "./store";

export default class BloodWorkStore {

    bloodWorks: BloodWork[] = [];
    bloodWorkRegistry = new Map<string, BloodWork>();
    selectedBloodWork: BloodWork | undefined = undefined;
    isModalFormOpen = false;

    constructor() {
        makeAutoObservable(this);
    }

    // Orders the array by their exam date
    get bloodWorksByExamDate() {
        return Array.from(this.bloodWorkRegistry.values()).sort((a, b) => 
            a.examDate!.getTime() - b.examDate!.getTime());
    }

    //Load the bloodworks that are associated with the logged in user.
    loadBloodWorks = async () => {
        try {
            if (store.userStore.IsLoggedIn){
                const bloodWorks = (await agent.BloodWorks.list()).filter(x => (x.userId === store.userStore.user?.id));
                runInAction(() => {
                    bloodWorks.forEach(bloodWork => {
                        bloodWork.examDate = new Date(bloodWork.examDate!);
                        bloodWork.resultsDate =  new Date(bloodWork.resultsDate!);
                        this.bloodWorkRegistry.set(bloodWork.id, bloodWork);
                    })
                })
            } else {
                this.bloodWorkRegistry.clear();
            }
        } catch (error) {
            console.log(error); //TODO: Proper error handling
        }
    }

    selectBloodWork = (id: string) => {
        this.selectedBloodWork = this.bloodWorkRegistry.get(id);
    }

    cancelSelectBloodWork = () => {
        this.selectedBloodWork = undefined;
    }

    //Shows the edit/create modal
    showModal = (id?: string) => {
        id ? this.selectBloodWork(id) : this.cancelSelectBloodWork();
        this.isModalFormOpen = true;
    }

    //Hides the edit/create modal
    hideModal = () => {
        this.isModalFormOpen = false;
    }

    //create a new bloodwork associated with the logged in user
    createBloodWork = async (bloodWork: BloodWork) => {
        bloodWork.id = uuid();
        bloodWork.userId = store.userStore.user!.id;
        try {
           await agent.BloodWorks.create(bloodWork);
           runInAction(() => {
                this.bloodWorkRegistry.set(bloodWork.id, bloodWork);
                this.selectedBloodWork = bloodWork;
                this.hideModal();
           })
        } catch (error) {
            console.log(error)
        }
    }

    //update (edit) a bloodwork that's selected
    updateBloodWork = async (bloodWork: BloodWork) => {
        try {
            await agent.BloodWorks.update(bloodWork);
            runInAction(() => {
                 this.bloodWorkRegistry.set(bloodWork.id, bloodWork);
                 this.selectedBloodWork = bloodWork;
                 this.hideModal();
            })
         } catch (error) {
             console.log(error)
         }
    }

    //delete a selected bloodwork, removing it from highlight
    deleteBloodWork = async (id: string) => {
        try {
            if (this.selectedBloodWork?.id === id) this.cancelSelectBloodWork();
            await agent.BloodWorks.delete(id);
            this.bloodWorkRegistry.delete(id);
        } catch (error) {
            console.log(error);
        }
    }
}