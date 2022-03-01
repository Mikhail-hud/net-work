import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAuthUserData, getCaptchaUrl } from "../actions/AuthAction";
import { User, UserCredential } from "../../types/userType";
import { ResultCodeTypes } from "../../types/apiTypes";
import { UserState } from "../../types/reducerTypes";
import { authAPI } from "../../api/api";
import { Notification } from "../../components/presentational/Notification";
import {
    RESULT_CODE_REJECT_WITH_SECURITY,
    RESULT_CODE_REJECT_WITH_WRONG_CREDENTIAL,
    RESULT_CODE_SUCCESS,
} from "../../constants/apiResultCodeConstans";

const initialState: UserState = {
    user: {
        id: null,
        email: null,
        login: null,
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
        let response = await authAPI.logout();
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
        setLoginError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
    extraReducers: {
        [logIn.fulfilled.type]: (state, action: PayloadAction<ResultCodeTypes>) => {
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
        [getAuthUserData.fulfilled.type]: (state, action: PayloadAction<User>) => {
            state.isLoading = false;
            if (action.payload) {
                state.isAuth = true;
                state.user = action.payload;
            }
        },
        [getAuthUserData.rejected.type]: state => {
            state.isLoading = false;
        },
        [getCaptchaUrl.fulfilled.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.captchaUrl = action.payload;
        },
        [logOut.fulfilled.type]: (state, action: PayloadAction<ResultCodeTypes>) => {
            if (action.payload === RESULT_CODE_SUCCESS) {
                state.user = { id: null, email: null, login: null };
                state.isAuth = false;
            }
        },
    },
});

export const { setLoginError } = authSlice.actions;

export default authSlice.reducer;
