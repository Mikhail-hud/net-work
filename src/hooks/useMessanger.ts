import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux";
import { DeleteRestoreMessageData, NewMessageData } from "../types/dialogsTypes";
import {
    fetchAllMessages,
    fetchDialogsChatting,
    sendMessage,
    deleteMessage,
    markMessageAsSpam,
    restoreMessage,
} from "../store/reducers/DialogsSlice";
import { useEffect } from "react";

export const useMessanger = () => {
    const dispatch = useAppDispatch();
    const params = useParams();
    const { messages, isFetchingMessages, totalMessagesCount } = useAppSelector(state => state.dialogsReducer);
    const userId = Number(params?.userId);
    const onSendMessage = (newMessage: NewMessageData): void => {
        dispatch(sendMessage(newMessage));
    };
    const onDeleteMessage = (deleteMessageData: DeleteRestoreMessageData): void => {
        dispatch(deleteMessage(deleteMessageData));
    };
    const onMarkMessageAsSpam = (messageId: string): void => {
        dispatch(markMessageAsSpam(messageId));
    };
    const onRestoreMessage = (restoreMessageData: DeleteRestoreMessageData): void => {
        dispatch(restoreMessage(restoreMessageData));
    };
    useEffect(() => {
        dispatch(fetchAllMessages({ userId: Number(userId) }));
        dispatch(fetchDialogsChatting(Number(userId)));
    }, [userId]);

    return {
        onSendMessage,
        onDeleteMessage,
        onMarkMessageAsSpam,
        onRestoreMessage,
        isFetchingMessages,
        messages,
        totalMessagesCount,
        userId,
    };
};
