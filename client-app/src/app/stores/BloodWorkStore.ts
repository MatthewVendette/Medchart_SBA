import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { BloodWork } from "../models/bloodWork";
import {v4 as uuid} from 'uuid';

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
            Date.parse(a.examDate) - Date.parse(b.examDate));
    }

    loadBloodWorks = async () => {
        try {
            const bloodWorks = await agent.BloodWorks.list();
            runInAction(() => {
                bloodWorks.forEach(bloodWork => {
                    bloodWork.examDate = bloodWork.examDate.split('T')[0]; //remove precise time
                    bloodWork.resultsDate = bloodWork.resultsDate.split('T')[0]; //remove precise time
                    this.bloodWorkRegistry.set(bloodWork.id, bloodWork);
                })
            })

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

    showModal = (id?: string) => {
        id ? this.selectBloodWork(id) : this.cancelSelectBloodWork();
        this.isModalFormOpen = true;
    }

    hideModal = () => {
        this.isModalFormOpen = false;
    }

    createBloodWork = async (bloodWork: BloodWork) => {
        bloodWork.id = uuid();
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