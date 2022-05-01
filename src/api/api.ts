import axios from "axios";
import { UsersQueryParameters } from "../types/usersType";

export const baseURL = "https://social-network.samuraijs.com/api/1.0/";
export const credentials = "include";
export const headers = {
    "API-KEY": "785356f0-bfad-453c-883d-856e6d5db0d2",
};
const instance = axios.create({
    baseURL,
    headers,
    withCredentials: true,
});

export const usersAPI = {
    getUsers({ count, page, friend, term }: UsersQueryParameters) {
        return instance.get(`users?page=${page}&count=${count}&friend=${friend}&term=${term}`).then(response => {
            return response.data;
        });
    },

    unfollow(id: number) {
        return instance.delete(`follow/${id}`).then(response => {
            return response.data;
        });
    },

    follow(id: number) {
        return instance.post(`follow/${id}`).then(response => {
            return response.data;
        });
    },
};

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`).then(response => {
            return response.data;
        });
    },

    getStatus(id) {
        return instance.get(`profile/status/${id}`).then(reponse => {
            return reponse.data;
        });
    },
    updateStatus(status) {
        return instance.put(`profile/status/`, { status: status }).then(response => {
            return response.data;
        });
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance
            .put(`profile/photo/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(response => {
                return response.data;
            });
    },

    saveProfile(profile) {
        return instance.put(`profile`, profile).then(response => {
            return response.data;
        });
    },
};

export const authAPI = {
    me() {
        return instance.get(`auth/me`).then(response => {
            return response.data;
        });
    },

    login(email, password, rememberMe = false, captcha = null) {
        return instance.post(`auth/login`, { email, password, rememberMe, captcha }).then(responce => {
            return responce.data;
        });
    },

    logout() {
        return instance.delete(`auth/login`).then(responce => {
            return responce.data;
        });
    },
};

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    },
};
