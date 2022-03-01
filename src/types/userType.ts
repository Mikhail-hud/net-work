export interface User {
    id: number;
    email: string;
    login: string;
}

export interface UserCredential {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha?: string;
}
