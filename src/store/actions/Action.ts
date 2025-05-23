import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI, profileAPI, securityAPI } from "../../api";
import { Notification } from "../../components";
import { RESULT_CODE_REJECT_WITH_WRONG_CREDENTIAL, RESULT_CODE_SUCCESS } from "../../constants/apiResultCodeConstans";

export const getAuthUserData = createAsyncThunk("auth/getAuthUserData", async (_a: never, { dispatch }) => {
    try {
        const response = await authAPI.me();
        if (response.resultCode === RESULT_CODE_SUCCESS) {
            dispatch(getAuthUserProfileData(response?.data?.id));
            return response;
        }
        if (response.resultCode === RESULT_CODE_REJECT_WITH_WRONG_CREDENTIAL) {
            return response;
        }
    } catch (e) {
        Notification(e.message);
    }
});

export const getAuthUserProfileData = createAsyncThunk("auth/getAuthUserProfileData", async (userId: number) => {
    try {
        return await profileAPI.getProfile(userId);
    } catch (e) {
        Notification(e.message);
    }
});
export const getCaptchaUrl = createAsyncThunk("auth/getCaptchaUrl", async () => {
    try {
        const response = await securityAPI.getCaptchaUrl();
        return response.data.url;
    } catch (e) {
        Notification(e.message);
    }
});
