import {
    Dialog,
    Message,
    NewMessageData,
    MessagesDataEntities,
    DeleteRestoreMessageData,
    NewMessageDataEntities,
    DeleteMessageDataEntities,
    SpamMessageDataEntities,
    RestoreMessageDataEntities,
} from "@app/types/dialogsTypes";
import { dialogsAPI } from "@app/api";
import { Notification } from "@components";
import { DialogsState } from "@app/types/reducerTypes/dialogsReducer";
import { RESULT_CODE_SUCCESS } from "@constants/apiResultCodeConstans";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: DialogsState = {
    dialogs: [],
    isFetchingDialogs: false,
    isFetchingMessages: false,
    messages: [],
    totalMessagesCount: null,
    newMessagesCount: null,
};
export const fetchAllDialogs = createAsyncThunk("dialogs/fetchAllDialogs", async (): Promise<Dialog[]> => {
    try {
        return await dialogsAPI.getallDialogs();
    } catch (e) {
        Notification(e.message);
    }
});

export const fetchAllMessages = createAsyncThunk(
    "dialogs/fetchAllMessages",
    async ({
        userId,
        page,
        count,
    }: {
        userId: number;
        page?: number;
        count?: number;
    }): Promise<MessagesDataEntities> => {
        try {
            return await dialogsAPI.getMessagesList(userId, page, count);
        } catch (e) {
            Notification(e.message);
        }
    }
);

export const sendMessage = createAsyncThunk(
    "dialogs/sendMessage",
    async (newMessageData: NewMessageData, { dispatch }): Promise<void> => {
        const { recipientId, body } = newMessageData;
        try {
            const response: NewMessageDataEntities = await dialogsAPI.sendMessage(recipientId, body);
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
            const response: DeleteMessageDataEntities = await dialogsAPI.deleteMessage(messageId);
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
    async (messageId: string, { dispatch }): Promise<void> => {
        try {
            const response: SpamMessageDataEntities = await dialogsAPI.markMessageAsSpam(messageId);
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
    async ({ messageId, byRecipient }: DeleteRestoreMessageData, { dispatch }): Promise<void> => {
        try {
            const response: RestoreMessageDataEntities = await dialogsAPI.restoreMessage(messageId);
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
    extraReducers: builder => {
        builder
            .addCase(fetchAllDialogs.pending, (state: DialogsState) => {
                state.isFetchingDialogs = true;
            })
            .addCase(fetchAllDialogs.fulfilled, (state: DialogsState, action: PayloadAction<Array<Dialog>>) => {
                state.dialogs = action.payload;
                state.isFetchingDialogs = false;
            })
            .addCase(fetchAllMessages.pending, (state: DialogsState) => {
                state.isFetchingMessages = true;
            })
            .addCase(fetchAllMessages.fulfilled, (state: DialogsState, action: PayloadAction<MessagesDataEntities>) => {
                state.messages = action?.payload?.items;
                state.totalMessagesCount = action?.payload?.totalCount;
                state.isFetchingMessages = false;
            });
    },
});

export const { setMessage, setDeleteMessage, setRestoreMessage, setMarkMessageAsSpam } = dialogsSlice.actions;

export default dialogsSlice.reducer;
