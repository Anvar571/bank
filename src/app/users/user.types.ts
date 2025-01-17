export enum UserType {
    INDIVIDUALS = "individuals",
}

export interface UserModel {
    id: number;
    username: string;
    jshir: string;
    passport_number: string;
    balance: number;
    phone: number;
    type: UserType,
}

export interface CreateUser {
    username: string;
    jshir: string;
    passport_number: string;
    phone: number;
}

export interface UserReturnData {
    id: number;
}