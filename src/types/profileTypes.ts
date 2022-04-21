export interface NewPostData {
    postText: string;
    postUserId: number;
    userFullName: string;
    userPhoto: string;
    postDate: string;
}

export interface Post extends NewPostData {
    id: number;
    likesCount: number;
    dislikesCount: number;
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

export interface ProfileLogoFile {
    lastModified: number;
    name: string;
    size: number;
    type: string;
    webkitRelativePath: string;
}