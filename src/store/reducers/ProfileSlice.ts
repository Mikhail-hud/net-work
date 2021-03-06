import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { profileAPI } from "../../api";
import { Notification } from "../../components";
import { ProfileState } from "../../types/reducerTypes";
import {
    NewLikeData,
    NewPostData,
    ProfileLogoFile,
    UpdatedPostData,
    UserProfile,
    UserProfilePhotos,
} from "../../types/profileTypes";
import { RESULT_CODE_REJECT_WITH_WRONG_CREDENTIAL, RESULT_CODE_SUCCESS } from "../../constants/apiResultCodeConstans";

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
    isProfileFetching: true,
    isProfileSaving: false,
    isStatusFetching: false,
    editMode: false,
    profileDataFormError: null,
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

export const saveProfile = createAsyncThunk(
    "profile/saveProfile",
    async (profile: UserProfile, { getState, dispatch }) => {
        try {
            const response = await profileAPI.saveProfile(profile);
            if (response.resultCode === RESULT_CODE_SUCCESS) {
                // @ts-ignore
                const { authReducer } = getState();
                return await profileAPI.getProfile(authReducer?.user?.id);
            }
            if (response.resultCode === RESULT_CODE_REJECT_WITH_WRONG_CREDENTIAL) {
                dispatch(setProfileDataFormError(response.messages));
            }
        } catch (e) {
            Notification(e.message);
        }
    }
);

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
                edited: false,
                likes: { likesCount: 0, usersProfile: [] },
                ...payload,
            };
            localStorage.setItem(String(state.profile.userId), JSON.stringify([...state.posts, newPost]));
            state.posts = [...state.posts, newPost];
        },
        updatePost: (state: ProfileState, action: PayloadAction<UpdatedPostData>) => {
            const { payload } = action;
            const posts = state.posts.map(post => {
                if (post.id === payload.id) {
                    return {
                        ...post,
                        edited: true,
                        postText: payload.postText,
                        postDate: payload.postDate,
                    };
                }
                return post;
            });
            localStorage.setItem(String(state.profile.userId), JSON.stringify(posts));
            state.posts = posts;
        },
        addLike: (state: ProfileState, action: PayloadAction<NewLikeData>) => {
            const { payload } = action;
            const posts = state.posts.map(post => {
                if (
                    post.id === payload.id &&
                    !post.likes.usersProfile.some(profile => profile?.userId === payload?.userProfile?.userId)
                ) {
                    return {
                        ...post,
                        likes: {
                            ...post.likes,
                            likesCount: post.likes.likesCount + 1,
                            usersProfile: [...post.likes.usersProfile, payload.userProfile],
                        },
                    };
                }
                if (post.id === payload.id) {
                    return {
                        ...post,
                        likes: {
                            ...post.likes,
                            likesCount: post.likes.likesCount - 1,
                            usersProfile: [
                                ...post.likes.usersProfile.filter(
                                    profile => profile.userId !== payload.userProfile.userId
                                ),
                            ],
                        },
                    };
                }
                return post;
            });
            localStorage.setItem(String(state.profile.userId), JSON.stringify(posts));
            state.posts = posts;
        },
        deletePost: (state: ProfileState, action: PayloadAction<number>) => {
            const { payload } = action;
            const posts = state.posts.filter(post => post.id !== payload);
            localStorage.setItem(String(state.profile.userId), JSON.stringify(posts));
            state.posts = posts;
        },
        setEditMode: (state: ProfileState, action: PayloadAction<boolean>) => {
            const { payload } = action;
            state.profileDataFormError = null;
            state.editMode = payload;
        },
        setProfileDataFormError: (state: ProfileState, action: PayloadAction<Array<string>>) => {
            const { payload } = action;
            state.profileDataFormError = payload;
            state.isProfileSaving = false;
        },
    },
    extraReducers: {
        [fetchProfile.pending.type]: state => {
            state.isProfileFetching = true;
        },
        [fetchProfile.fulfilled.type]: (state: ProfileState, action: PayloadAction<UserProfile>) => {
            const { payload } = action;
            state.profile = payload;
            state.isProfileFetching = false;
        },
        [savePhoto.pending.type]: (state: ProfileState) => {
            state.isPhotoSaving = true;
        },
        [savePhoto.fulfilled.type]: (state: ProfileState, action: PayloadAction<UserProfilePhotos>) => {
            const { payload } = action;
            state.profile.photos = payload;
            state.isPhotoSaving = false;
        },
        [getStatus.pending.type]: (state: ProfileState) => {
            state.isStatusFetching = true;
        },
        [getStatus.fulfilled.type]: (state: ProfileState, action: PayloadAction<string>) => {
            const { payload } = action;
            state.status = payload;
            state.isStatusFetching = false;
        },
        [saveProfile.pending.type]: (state: ProfileState) => {
            state.isProfileSaving = true;
        },
        [saveProfile.fulfilled.type]: (state: ProfileState, action: PayloadAction<UserProfile>) => {
            const { payload } = action;
            if (payload) {
                state.profile = payload;
                state.isProfileSaving = false;
                state.editMode = false;
                state.profileDataFormError = null;
            }
        },
        [saveProfile.rejected.type]: (state: ProfileState) => {
            state.isProfileSaving = false;
        },
    },
});

export const { setStatus, addPost, deletePost, getPosts, addLike, updatePost, setEditMode, setProfileDataFormError } =
    profileSlice.actions;

export default profileSlice.reducer;
