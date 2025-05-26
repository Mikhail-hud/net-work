import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAuthUserData, getAuthUserProfileData, getCaptchaUrl } from "../actions";
import { UserCredential } from "../../types/userType";
import { ResultCodeTypes } from "../../types/apiTypes";
import { UserDataPayload, UserState } from "@app/types/reducerTypes";
import { authAPI } from "@api";
import { Notification } from "@components";
import {
    RESULT_CODE_REJECT_WITH_SECURITY,
    RESULT_CODE_REJECT_WITH_WRONG_CREDENTIAL,
    RESULT_CODE_SUCCESS,
} from "@constants/apiResultCodeConstans";
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
    extraReducers: builder => {
        builder
            .addCase(logIn.pending, state => {
                state.isLoading = true;
            })
            .addCase(logIn.fulfilled, (state, action) => {
                if (action.payload === RESULT_CODE_REJECT_WITH_WRONG_CREDENTIAL) {
                    state.isLoading = false;
                }
                if (action.payload === RESULT_CODE_SUCCESS) {
                    state.captchaUrl = null;
                }
            })
            .addCase(logIn.rejected, state => {
                state.isLoading = false;
            })
            .addCase(getAuthUserData.pending, state => {
                state.isLoading = true;
            })
            .addCase(getAuthUserData.fulfilled, (state, action: PayloadAction<UserDataPayload>) => {
                if (action.payload.resultCode === RESULT_CODE_SUCCESS) {
                    state.isAuth = true;
                    state.user = { ...state.user, ...action.payload.data };
                } else {
                    state.isLoading = false;
                }
            })
            .addCase(getAuthUserData.rejected, state => {
                state.isLoading = false;
            })
            .addCase(getAuthUserProfileData.fulfilled, (state, action: PayloadAction<UserProfile>) => {
                state.user.profile = action.payload;
                state.isLoading = false;
            })
            .addCase(getCaptchaUrl.fulfilled, (state, action: PayloadAction<string>) => {
                state.captchaUrl = action.payload;
                state.isLoading = false;
            })
            .addCase(logOut.fulfilled, (state, action: PayloadAction<ResultCodeTypes | null>) => {
                if (action.payload === RESULT_CODE_SUCCESS) {
                    state.user = null;
                    state.isAuth = false;
                }
            });
    },
});

export const { setLoginError } = authSlice.actions;

export default authSlice.reducer;
