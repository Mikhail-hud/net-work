import { UserProfile } from "./profileTypes";
import { BaseResponse } from "@app/types/apiTypes";

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

export type AuthDataEntities = BaseResponse<Omit<User, "profile">>;
export type LogOutDataEntities = BaseResponse<Record<string, unknown>>;
export type LogInDataEntities = BaseResponse<{ token: string; userId: number }>;
