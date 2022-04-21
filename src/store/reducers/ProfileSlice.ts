import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { profileAPI } from "../../api";
import { Notification } from "../../components";
import { ProfileState } from "../../types/reducerTypes";
import { NewPostData, ProfileLogoFile, UserProfile, UserProfilePhotos } from "../../types/profileTypes";
import { RESULT_CODE_SUCCESS } from "../../constants/apiResultCodeConstans";

const initialState: ProfileState = {
    posts: [],
    profile: {
        aboutMe: null,
        contacts: {
            facebook: null,
            github: null,
            instagram: null,
            mainLink: null,
            twitter: null,
            vk: null,
            website: null,
            youtube: null,
        },
        fullName: null,
        lookingForAJob: null,
        lookingForAJobDescription: null,
        photos: {
            large: null,
            small: null,
        },
        userId: null,
    },
    status: "",
    isFetching: true,
    isPhotoSaving: false,
};

export const fetchProfile = createAsyncThunk("profile/fetchProfile", async (userId: number) => {
    try {
        return await profileAPI.getProfile(userId);
    } catch (e) {
        Notification(e.message);
    }
});

export const getStatus = createAsyncThunk("profile/getStatus", async (userId: number) => {
    try {
        return await profileAPI.getStatus(userId);
    } catch (e) {
        Notification(e.message);
    }
});
export const updateStatus = createAsyncThunk("profile/updateStatus", async (status: string, { dispatch }) => {
    try {
        const response = await profileAPI.updateStatus(status);
        if (response.resultCode === RESULT_CODE_SUCCESS) {
            dispatch(setStatus(status));
        }
    } catch (e) {
        Notification(e.message);
    }
});

export const savePhoto = createAsyncThunk("profile/savePhoto", async (file: ProfileLogoFile) => {
    try {
        const response = await profileAPI.savePhoto(file);
        if (response.resultCode === RESULT_CODE_SUCCESS) {
            return response.data.photos;
        }
    } catch (e) {
        Notification(e.message);
    }
});

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setStatus: (state: ProfileState, action: PayloadAction<string>) => {
            const { payload } = action;
            state.status = payload;
        },
        getPosts: (state: ProfileState, action: PayloadAction<number>) => {
            const { payload } = action;
            const posts = JSON.parse(localStorage.getItem(String(payload))) ?? [];
            state.posts = [...posts];
        },
        addPost: (state: ProfileState, action: PayloadAction<NewPostData>) => {
            const { payload } = action;
            const rand = 100000 + Math.random() * (10000 + 1 - 10);
            const newPost = {
                id: rand,
                likesCount: 0,
                dislikesCount: 0,
                ...payload,
            };
            localStorage.setItem(String(state.profile.userId), JSON.stringify([...state.posts, newPost]));
            state.posts = [...state.posts, newPost];
        },
        deletePost: (state: ProfileState, action: PayloadAction<number>) => {
            const { payload } = action;
            const posts = state.posts.filter(post => post.id !== payload);
            localStorage.setItem(String(state.profile.userId), JSON.stringify(posts));
            state.posts = [...posts];
        },
    },
    extraReducers: {
        [fetchProfile.pending.type]: state => {
            state.isFetching = true;
        },
        [fetchProfile.fulfilled.type]: (state: ProfileState, action: PayloadAction<UserProfile>) => {
            const { payload } = action;
            state.isFetching = false;
            state.profile = payload;
        },
        [savePhoto.pending.type]: (state: ProfileState) => {
            state.isPhotoSaving = true;
        },
        [savePhoto.fulfilled.type]: (state: ProfileState, action: PayloadAction<UserProfilePhotos>) => {
            const { payload } = action;
            state.profile.photos = payload;
            state.isPhotoSaving = false;
        },
        [getStatus.fulfilled.type]: (state: ProfileState, action: PayloadAction<string>) => {
            const { payload } = action;
            state.status = payload;
        },
    },
});

export const { setStatus, addPost, deletePost, getPosts } = profileSlice.actions;
export default profileSlice.reducer;