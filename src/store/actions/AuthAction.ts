import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI, securityAPI } from "../../api/api";
import { Notification } from "../../components/presentational/Notification";
import { RESULT_CODE_SUCCESS } from "../../constants/apiResultCodeConstans";

export const getAuthUserData = createAsyncThunk("auth/getAuthUserData", async () => {
    try {
        const response = await authAPI.me();
        if (response.resultCode === RESULT_CODE_SUCCESS) {
            return response.data;
        }
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
