import { User } from "@app/types/userType";

export interface UserState {
    user: User;
    isAuth: boolean;
    captchaUrl: string;
    isLoading: boolean;
    error: string;
}
