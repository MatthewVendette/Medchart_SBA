import axios, { AxiosResponse } from 'axios';
import { BloodWork } from '../models/bloodWork';
import { User, UserCredentials } from '../models/user';
import { store } from '../stores/store';

axios.defaults.baseURL = 'http://localhost:5000/api';

//For persistency; if there's a get request to accounts and the user has a token, use the token
axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

const responseBody = <T> (response: AxiosResponse <T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

//TODO: implement some type safety
const BloodWorks = {
    list: () => requests.get<BloodWork[]>('/bloodworks'), 
    details: (id: string) => requests.get<BloodWork>(`/bloodworks/${id}`),
    create: (bloodWork: BloodWork) => requests.post<void>('/bloodworks', bloodWork),
    update: (bloodWork: BloodWork) => requests.put<void>(`/bloodworks/${bloodWork.id}`, bloodWork),
    delete: (id: string) => requests.del<void>(`/bloodworks/${id}`)

}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserCredentials) => requests.post<User>('/account/login', user ),
    register: (user: UserCredentials) => requests.post<User>('/account/register', user),
}

const agent = {
    BloodWorks,
    Account
}

export default agent;