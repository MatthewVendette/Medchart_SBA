export interface User {
    firstName: string;
    token: string; 
    username: string;
}

export interface UserCredentials {
    email: string;
    password: string;
    firstName?: string;
    username?: string;
}