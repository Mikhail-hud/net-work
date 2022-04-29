import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAuthUserData, getAuthUserProfileData, getCaptchaUrl } from "../actions";
import { UserCredential } from "../../types/userType";
import { ResultCodeTypes } from "../../types/apiTypes";
import { UserDataPayload, UserState } from "../../types/reducerTypes";
import { authAPI } from "../../api";
import { Notification } from "../../components";
import {
    RESULT_CODE_REJECT_WITH_SECURITY,
    RESULT_CODE_REJECT_WITH_WRONG_CREDENTIAL,
    RESULT_CODE_SUCCESS,
} from "../../constants/apiResultCodeConstans";
import { UserProfile } from "../../types/profileTypes";

const initialState: UserState = {
    user: {
        id: null,
        email: null,
        login: null,
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
    },
    isAuth: false,
    captchaUrl: null,
    isLoading: false,
    error: null,
};

export const logIn = createAsyncThunk("auth/logIn", async (userData: UserCredential, { dispatch }) => {
    const { email, password, rememberMe, captcha } = userData;
    try {
        const response = await authAPI.login(email, password, rememberMe, captcha);
        if (response.resultCode === RESULT_CODE_SUCCESS) {
            dispatch(setLoginError(null));
            dispatch(getAuthUserData());
            return response.resultCode;
        }
        if (response.resultCode === RESULT_CODE_REJECT_WITH_WRONG_CREDENTIAL) {
            dispatch(setLoginError(response.messages.join()));
            Notification(response.messages.join(), "Please check your credentials and try again!");
            return response.resultCode;
        }
        if (response.resultCode === RESULT_CODE_REJECT_WITH_SECURITY) {
            dispatch(getCaptchaUrl());
        }
    } catch (e) {
        Notification(e.message);
    }
});
export const logOut = createAsyncThunk("auth/logOut", async () => {
    try {
        const response = await authAPI.logout();
        if (response.resultCode === RESULT_CODE_SUCCESS) {
            return response.resultCode;
        }
    } catch (e) {
        Notification(e.message);
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoginError: (state: UserState, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
    extraReducers: {
        [logIn.fulfilled.type]: (state: UserState, action: PayloadAction<ResultCodeTypes>) => {
            if (action.payload === RESULT_CODE_REJECT_WITH_WRONG_CREDENTIAL) {
                state.isLoading = false;
            }
            if (action.payload === RESULT_CODE_SUCCESS) {
                state.captchaUrl = null;
            }
        },
        [logIn.pending.type]: state => {
            state.isLoading = true;
        },
        [logIn.rejected.type]: state => {
            state.isLoading = false;
        },
        [getAuthUserData.pending.type]: (state: UserState) => {
            state.isLoading = true;
        },
        [getAuthUserData.fulfilled.type]: (state: UserState, action: PayloadAction<UserDataPayload>) => {
            if (action.payload.resultCode === RESULT_CODE_SUCCESS) {
                state.isAuth = true;
                state.user = { ...state.user, ...action.payload.data };
            } else {
                state.isLoading = false;
            }
        },
        [getAuthUserData.rejected.type]: state => {
            state.isLoading = false;
        },
        [getAuthUserProfileData.fulfilled.type]: (state: UserState, action: PayloadAction<UserProfile>) => {
            const { payload } = action;
            state.isLoading = false;
            state.user.profile = payload;
        },
        [getCaptchaUrl.fulfilled.type]: (state: UserState, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.captchaUrl = action.payload;
        },
        [logOut.fulfilled.type]: (state: UserState, action: PayloadAction<ResultCodeTypes>) => {
            if (action.payload === RESULT_CODE_SUCCESS) {
                state.user = null;
                state.isAuth = false;
            }
        },
    },
});

export const { setLoginError } = authSlice.actions;

export default authSlice.reducer;
