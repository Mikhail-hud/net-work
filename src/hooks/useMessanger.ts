import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux";
import { NewMessageData } from "../types/dialogsTypes";
import { fetchDialogsChatting, sendMessage } from "../store/reducers/DialogsSlice";
import { useEffect } from "react";

export const useMessanger = () => {
    const dispatch = useAppDispatch();
    const params = useParams();
    const { messages } = useAppSelector(state => state.dialogsReducer);
    const userId = params?.userId;
    const onSendMessage = (newMessage: NewMessageData): void => {
        dispatch(sendMessage(newMessage));
    };
    useEffect(() => {
        dispatch(fetchDialogsChatting(Number(userId)));
    }, []);

    return {
        onSendMessage,
        messages,
        userId,
    };
};
