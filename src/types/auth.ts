export interface AuthenticatedUser {
    nameid: string;
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    uniqueId: string

}

export enum Status {
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    IDLE = 'IDLE'
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserSignup {
    firstName: string,
    lastName: string,
    email: string,
    gender: string,
    password: string,
    confirmPassword: string,
    phoneNumber: string,
    regnum: string,
    token: string
}

export interface AuthRequestStatus {
    loginUser: Status;
    signupUser: Status;
    getUser: Status
    forgotUser: Status;
    resetUser: Status
}


export const AuthenticatedUserType = {
    nameid: '',
    email: '',
    phoneNumber: '',
    firstName: '',
    lastName: '',
    uniqueId: ''
}

export interface User {
    firstName: string,
    lastName: string,
    email: string,
    gender: string,
    password: string,
    regnum: string,

}

export interface userList {
    user: Array<User>
}