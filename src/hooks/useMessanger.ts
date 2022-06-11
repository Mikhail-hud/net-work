import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux";
import { NewMessageData } from "../types/dialogsTypes";
import { fetchAllMessages, fetchDialogsChatting, sendMessage } from "../store/reducers/DialogsSlice";
import { useEffect } from "react";

export const useMessanger = () => {
    const dispatch = useAppDispatch();
    const params = useParams();
    const { messages, isFetchingMessages } = useAppSelector(state => state.dialogsReducer);
    const userId = Number(params?.userId);
    const onSendMessage = (newMessage: NewMessageData): void => {
        dispatch(sendMessage(newMessage));
    };
    useEffect(() => {
        dispatch(fetchAllMessages(Number(userId)));
        dispatch(fetchDialogsChatting(Number(userId)));
    }, [userId]);

    return {
        onSendMessage,
        isFetchingMessages,
        messages,
        userId,
    };
};
