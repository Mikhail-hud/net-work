import axios from "axios";
import {
    Dialog,
    MessagesDataEntities,
    NewMessageDataEntities,
    DeleteMessageDataEntities,
    SpamMessageDataEntities,
    RestoreMessageDataEntities,
} from "@app/types/dialogsTypes";
import { AuthDataEntities, LogInDataEntities, LogOutDataEntities } from "@app/types/userType";
import { FollowUnFollowDataEntities, UsersDataEntities, UsersQueryParameters } from "@app/types/usersType";
import { PhotoDataEntities, ProfileDataEntities, StatusDataEntities, UserProfile } from "@app/types/profileTypes";

export const baseURL = "https://social-network.samuraijs.com/api/1.0/";
export const webSocketUrl = "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx";
export const credentials = "include";
export const EMPTY_QUERY_PARAMS = null;
export const headers = {
    "API-KEY": "785356f0-bfad-453c-883d-856e6d5db0d2",
};
const instance = axios.create({
    baseURL,
    headers,
    withCredentials: true,
});

export const usersAPI = {
    async getUsers({ count, page, friend, term }: UsersQueryParameters): Promise<UsersDataEntities> {
        const response = await instance.get(`users?page=${page}&count=${count}&friend=${friend}&term=${term}`);
        return response.data;
    },

    async unfollow(id: number): Promise<FollowUnFollowDataEntities> {
        const response = await instance.delete(`follow/${id}`);
        return response.data;
    },

    async follow(id: number): Promise<FollowUnFollowDataEntities> {
        const response = await instance.post(`follow/${id}`);
        return response.data;
    },
};

export const profileAPI = {
    async getProfile(userId: number): Promise<UserProfile> {
        const response = await instance.get(`profile/${userId}`);
        return response.data;
    },

    async getStatus(id: number): Promise<string> {
        const reponse = await instance.get(`profile/status/${id}`);
        return reponse.data;
    },
    async updateStatus(status: string): Promise<StatusDataEntities> {
        const response = await instance.put(`profile/status/`, { status: status });
        return response.data;
    },
    async savePhoto(photoFile: Blob): Promise<PhotoDataEntities> {
        const formData = new FormData();
        formData.append("image", photoFile);
        const response = await instance.put(`profile/photo/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },

    async saveProfile(profile: UserProfile): Promise<ProfileDataEntities> {
        const response = await instance.put(`profile`, profile);
        return response.data;
    },
};

export const authAPI = {
    async me(): Promise<AuthDataEntities> {
        const response = await instance.get(`auth/me`);
        return response.data;
    },

    async login(email: string, password: string, rememberMe = false, captcha = null): Promise<LogInDataEntities> {
        const responce = await instance.post(`auth/login`, { email, password, rememberMe, captcha });
        return responce.data;
    },

    async logout(): Promise<LogOutDataEntities> {
        const responce = await instance.delete(`auth/login`);
        return responce.data;
    },
};

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    },
};
export const dialogsAPI = {
    async getallDialogs(): Promise<Dialog[]> {
        return instance.get(`dialogs`).then(response => {
            return response.data;
        });
    },
    async getMessagesList(userId: number, page: number, count: number): Promise<MessagesDataEntities> {
        const response = await instance.get(`dialogs/${userId}/messages?page=${page}&count=${count}`);
        return response.data;
    },
    async sendMessage(recipientId: number, body: string): Promise<NewMessageDataEntities> {
        const response = await instance.post(`dialogs/${recipientId}/messages`, { body });
        return response.data;
    },
    async deleteMessage(messageId: string): Promise<DeleteMessageDataEntities> {
        const response = await instance.delete(`dialogs/messages/${messageId}`);
        return response.data;
    },
    async markMessageAsSpam(messageId: string): Promise<SpamMessageDataEntities> {
        const response = await instance.post(`dialogs/messages/${messageId}/spam`);
        return response.data;
    },
    async restoreMessage(messageId: string): Promise<RestoreMessageDataEntities> {
        const response = await instance.put(`dialogs/messages/${messageId}/restore`);
        return response.data;
    },
};
