import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DialogsState } from "../../types/reducerTypes/dialogsReducer";
import { Dialog } from "../../types/dialogsTypes";
import { dialogsAPI } from "../../api";
import { Notification } from "../../components";

const initialState: DialogsState = {
    dialogs: [],
    isFetchingDialogs: false,
    messages: [],
};
export const fetchAllDialogs = createAsyncThunk("dialogs/fetchAllDialogs", async () => {
    try {
        return await dialogsAPI.getallDialogs();
    } catch (e) {
        Notification(e.message);
    }
});
export const fetchDialogsChatting = createAsyncThunk("dialogs/fetchDialogsChatting", async (userId: number) => {
    try {
        await dialogsAPI.getDialogsChatting(userId);
    } catch (e) {
        Notification(e.message);
    }
});
export const sendMessage = createAsyncThunk(
    "dialogs/sendMessage",
    async ({ userId, message }: { userId: number; message: string }) => {
        console.log(userId, message);
        try {
            await dialogsAPI.sendMessage(userId, message);
        } catch (e) {
            Notification(e.message);
        }
    }
);

export const dialogsSlice = createSlice({
    name: "dialogs",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAllDialogs.pending.type]: (state: DialogsState) => {
            state.isFetchingDialogs = true;
        },
        [fetchAllDialogs.fulfilled.type]: (state: DialogsState, action: PayloadAction<Array<Dialog>>) => {
            state.dialogs = action.payload;
            state.isFetchingDialogs = false;
        },
    },
});

// export const {} = dialogsSlice.actions;

export default dialogsSlice.reducer;
