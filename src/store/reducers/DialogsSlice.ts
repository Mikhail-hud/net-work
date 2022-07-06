import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DialogsState } from "../../types/reducerTypes/dialogsReducer";
import { Dialog, Message, MessagesDataEntities, NewMessageData } from "../../types/dialogsTypes";
import { dialogsAPI } from "../../api";
import { Notification } from "../../components";
import { RESULT_CODE_SUCCESS } from "../../constants/apiResultCodeConstans";

const initialState: DialogsState = {
    dialogs: [],
    isFetchingDialogs: false,
    isFetchingMessages: false,
    messages: [],
};
export const fetchAllDialogs = createAsyncThunk("dialogs/fetchAllDialogs", async () => {
    try {
        return await dialogsAPI.getallDialogs();
    } catch (e) {
        Notification(e.message);
    }
});

export const fetchAllMessages = createAsyncThunk("dialogs/fetchAllMessages", async (userId: number) => {
    try {
        return await dialogsAPI.getMessagesList(userId);
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
    async (newMessageData: NewMessageData, { dispatch }) => {
        const { recipientId, body } = newMessageData;
        try {
            const response = await dialogsAPI.sendMessage(recipientId, body);
            if (response.resultCode === RESULT_CODE_SUCCESS) {
                dispatch(setMessage(response.data.message));
            }
        } catch (e) {
            Notification(e.message);
        }
    }
);

export const dialogsSlice = createSlice({
    name: "dialogs",
    initialState,
    reducers: {
        setMessage: (state: DialogsState, action: PayloadAction<Message>) => {
            state.messages = [...state.messages, action.payload];
        },
    },
    extraReducers: {
        [fetchAllDialogs.pending.type]: (state: DialogsState) => {
            state.isFetchingDialogs = true;
        },
        [fetchAllDialogs.fulfilled.type]: (state: DialogsState, action: PayloadAction<Array<Dialog>>) => {
            state.dialogs = action.payload;
            state.isFetchingDialogs = false;
        },
        [fetchAllMessages.pending.type]: (state: DialogsState) => {
            state.isFetchingMessages = true;
        },
        [fetchAllMessages.fulfilled.type]: (state: DialogsState, action: PayloadAction<MessagesDataEntities>) => {
            state.messages = action?.payload?.items;
            state.isFetchingMessages = false;
        },
    },
});

export const { setMessage } = dialogsSlice.actions;

export default dialogsSlice.reducer;
