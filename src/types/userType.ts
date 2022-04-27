import { UserProfile } from "./profileTypes";

export interface User {
    id: number;
    email: string;
    login: string;
    profile: UserProfile;
}

export interface UserCredential {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha?: string;
}
