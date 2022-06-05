import { Dialog, Message } from "../dialogsTypes";

export interface DialogsState {
    dialogs: Array<Dialog>;
    isFetchingDialogs: boolean;
    isFetchingMessages: boolean;
    messages: Array<Message>;
}
