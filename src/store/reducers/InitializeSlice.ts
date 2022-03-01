import { createSlice } from "@reduxjs/toolkit";
import { InitializeState } from "../../types/reducerTypes";
import { getAuthUserData } from "../actions/AuthAction";
const initialState: InitializeState = {
    initialized: false,
};

export const initializeSlice = createSlice({
    name: "appInitialize",
    initialState,
    reducers: {},
    extraReducers: {
        [getAuthUserData.fulfilled.type]: state => {
            state.initialized = true;
        },
    },
});

export default initializeSlice.reducer;
