import { Dialog, Message } from "../dialogsTypes";

export interface DialogsState {
    dialogs: Array<Dialog>;
    isFetchingDialogs: boolean;
    messages: Array<Message>;
}
