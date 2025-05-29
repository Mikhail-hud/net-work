import { BaseResponse } from "@app/types/apiTypes";

export interface NewPostData {
    postText: string;
    postDate: string;
    profile: UserProfile;
}

export interface UpdatedPostData {
    id: string;
    postText: string;
    postDate: string;
}

export interface LikeData {
    likesCount: number;
    usersProfile: Array<UserProfile>;
}

export interface Post extends NewPostData {
    edited: boolean;
    id: string;
    likes: LikeData;
}

export interface NewLikeData {
    id: string;
    userProfile: UserProfile;
}

export interface UserProfileContacts {
    facebook: string;
    github: string;
    instagram: string;
    mainLink: string;
    twitter: string;
    vk: string;
    website: string;
    youtube: string;
}

export interface UserProfilePhotos {
    large: string;
    small: string;
}

export interface UserProfile {
    aboutMe: string;
    contacts: UserProfileContacts;
    fullName: string;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    photos: UserProfilePhotos;
    userId: number;
}

export type StatusDataEntities = BaseResponse<Record<string, unknown>>;
export type ProfileDataEntities = BaseResponse<Record<string, unknown>>;
export type PhotoDataEntities = BaseResponse<{ photos: UserProfilePhotos }>;
