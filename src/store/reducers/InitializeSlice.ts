import { createSlice } from "@reduxjs/toolkit";
import { getAuthUserData } from "@app/store/actions";
import { InitializeState } from "@app/types/reducerTypes";
const initialState: InitializeState = {
    initialized: false,
};

export const initializeSlice = createSlice({
    name: "appInitialize",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAuthUserData.fulfilled, (state: InitializeState) => {
            state.initialized = true;
        });
    },
});

export default initializeSlice.reducer;
