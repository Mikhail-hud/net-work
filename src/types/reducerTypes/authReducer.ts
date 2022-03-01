import { User } from "../userType";

export interface UserState {
    user: User;
    isAuth: boolean;
    captchaUrl: string;
    isLoading: boolean;
    error: string;
}
