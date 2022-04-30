import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DialogsState } from "../../types/reducerTypes/dialogsReducer";
import { NewMessageData } from "../../types/dialogsTypes";

const initialState: DialogsState = {
    dialogs: [],
    messages: [],
};

export const dialogsSlice = createSlice({
    name: "dialogs",
    initialState,
    reducers: {
        sendMessage: (state: DialogsState, action: PayloadAction<NewMessageData>) => {
            const { payload } = action;
            const rand = 100000 + Math.random() * (10000 + 1 - 10);
            const newMessage = {
                id: rand,
                ...payload,
            };
            state.messages = [...state.messages, newMessage];
        },
    },
    extraReducers: {},
});

export const { sendMessage } = dialogsSlice.actions;

export default dialogsSlice.reducer;
