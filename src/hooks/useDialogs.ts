import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux";
import { NewMessageData } from "../types/dialogsTypes";
import { sendMessage } from "../store/reducers/DialogsSlice";

export const useDialogs = () => {
    const dispatch = useAppDispatch();
    const params = useParams();
    const { user } = useAppSelector(state => state.authReducer);
    const { dialogs, messages } = useAppSelector(state => state.dialogsReducer);
    const userId = params?.userId ?? user.id;
    const isOwner = !params.userId;
    const onSendMessage = (newMessage: NewMessageData): void => {
        dispatch(sendMessage(newMessage));
    };

    return {
        dialogs,
        onSendMessage,
        messages,
        user,
        isOwner,
        userId,
    };
};
