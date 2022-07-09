import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DialogsState } from "../../types/reducerTypes/dialogsReducer";
import {
    DeleteRestoreMessageData,
    Dialog,
    Message,
    MessagesDataEntities,
    NewMessageData,
} from "../../types/dialogsTypes";
import { dialogsAPI } from "../../api";
import { Notification } from "../../components";
import { RESULT_CODE_SUCCESS } from "../../constants/apiResultCodeConstans";

const initialState: DialogsState = {
    dialogs: [],
    isFetchingDialogs: false,
    isFetchingMessages: false,
    messages: [],
    totalMessagesCount: null,
};
export const fetchAllDialogs = createAsyncThunk("dialogs/fetchAllDialogs", async () => {
    try {
        return await dialogsAPI.getallDialogs();
    } catch (e) {
        Notification(e.message);
    }
});

export const fetchAllMessages = createAsyncThunk(
    "dialogs/fetchAllMessages",
    async ({ userId, page, count }: { userId: number; page?: number; count?: number }) => {
        try {
            return await dialogsAPI.getMessagesList(userId, page, count);
        } catch (e) {
            Notification(e.message);
        }
    }
);

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
export const deleteMessage = createAsyncThunk(
    "dialogs/deleteMessage",
    async ({ messageId, byRecipient }: DeleteRestoreMessageData, { dispatch }) => {
        try {
            const response = await dialogsAPI.deleteMessage(messageId);
            if (response.resultCode === RESULT_CODE_SUCCESS) {
                dispatch(setDeleteMessage({ messageId, byRecipient }));
            }
        } catch (e) {
            Notification(e.message);
        }
    }
);
export const markMessageAsSpam = createAsyncThunk(
    "dialogs/markMessageAsSpam",
    async (messageId: string, { dispatch }) => {
        try {
            const response = await dialogsAPI.markMessageAsSpam(messageId);
            if (response.resultCode === RESULT_CODE_SUCCESS) {
                dispatch(setMarkMessageAsSpam({ messageId }));
            }
        } catch (e) {
            Notification(e.message);
        }
    }
);
export const restoreMessage = createAsyncThunk(
    "dialogs/restoreMessage",
    async ({ messageId, byRecipient }: DeleteRestoreMessageData, { dispatch }) => {
        try {
            const response = await dialogsAPI.restoreMessage(messageId);
            if (response.resultCode === RESULT_CODE_SUCCESS) {
                dispatch(setRestoreMessage({ messageId, byRecipient }));
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
        setDeleteMessage: (state: DialogsState, action: PayloadAction<DeleteRestoreMessageData>) => {
            const { messageId, byRecipient } = action.payload;
            state.messages = state.messages.map(message => {
                if (message.id === messageId && byRecipient) {
                    return {
                        ...message,
                        deletedByRecipient: true,
                    };
                }
                if (message.id === messageId && !byRecipient) {
                    return {
                        ...message,
                        deletedBySender: true,
                    };
                }
                return message;
            });
        },
        setRestoreMessage: (state: DialogsState, action: PayloadAction<DeleteRestoreMessageData>) => {
            const { messageId, byRecipient } = action.payload;
            state.messages = state.messages.map(message => {
                if (message.id === messageId && byRecipient) {
                    return {
                        ...message,
                        deletedByRecipient: false,
                        isSpam: false,
                    };
                }
                if (message.id === messageId && !byRecipient) {
                    return {
                        ...message,
                        deletedBySender: false,
                        isSpam: false,
                    };
                }
                return message;
            });
        },
        setMarkMessageAsSpam: (state: DialogsState, action: PayloadAction<{ messageId: string }>) => {
            const { messageId } = action.payload;
            state.messages = state.messages.map(message => {
                if (message.id === messageId) {
                    return {
                        ...message,
                        isSpam: true,
                    };
                }
                return message;
            });
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
            state.totalMessagesCount = action?.payload?.totalCount;
            state.isFetchingMessages = false;
        },
    },
});

export const { setMessage, setDeleteMessage, setRestoreMessage, setMarkMessageAsSpam } = dialogsSlice.actions;

export default dialogsSlice.reducer;
