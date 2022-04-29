import { User } from "../userType";
import { ResultCodeTypes } from "../apiTypes";

export interface UserState {
    user: User;
    isAuth: boolean;
    captchaUrl: string;
    isLoading: boolean;
    error: string;
}
export interface UserDataPayload {
    data: User;
    fieldsErrors: Array<string>;
    messages: Array<string>;
    resultCode: ResultCodeTypes;
}
