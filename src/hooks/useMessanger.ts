import { useEffect } from "react";
import {
    sendMessage,
    deleteMessage,
    restoreMessage,
    fetchAllMessages,
    markMessageAsSpam,
} from "@app/store/reducers/DialogsSlice";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@app/hooks/redux";
import { DeleteRestoreMessageData, Message, NewMessageData } from "@app/types/dialogsTypes";

interface UseMessanger {
    onSendMessage: (newMessage: NewMessageData) => void;
    onDeleteMessage: (deleteMessageData: DeleteRestoreMessageData) => void;
    onMarkMessageAsSpam: (messageId: string) => void;
    onRestoreMessage: (restoreMessageData: DeleteRestoreMessageData) => void;
    isFetchingMessages: boolean;
    messages: Message[];
    totalMessagesCount: number;
    userId: number;
}

export const useMessanger = (): UseMessanger => {
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
    useEffect((): void => {
        dispatch(fetchAllMessages({ userId: Number(userId) }));
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
