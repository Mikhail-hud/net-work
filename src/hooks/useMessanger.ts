import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux";
import { NewMessageData } from "../types/dialogsTypes";
import { fetchAllMessages, fetchDialogsChatting, sendMessage, deleteMessage } from "../store/reducers/DialogsSlice";
import { useEffect } from "react";

export const useMessanger = () => {
    const dispatch = useAppDispatch();
    const params = useParams();
    const { messages, isFetchingMessages, totalMessagesCount } = useAppSelector(state => state.dialogsReducer);
    const userId = Number(params?.userId);
    const onSendMessage = (newMessage: NewMessageData): void => {
        dispatch(sendMessage(newMessage));
    };
    const onDeleteMessage = (messageId: string): void => {
        dispatch(deleteMessage(messageId));
    };
    useEffect(() => {
        dispatch(fetchAllMessages({ userId: Number(userId) }));
        dispatch(fetchDialogsChatting(Number(userId)));
    }, [userId]);

    return {
        onSendMessage,
        onDeleteMessage,
        isFetchingMessages,
        messages,
        totalMessagesCount,
        userId,
    };
};
