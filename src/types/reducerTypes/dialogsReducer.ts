import { Dialog, Message } from "../dialogsTypes";

export interface DialogsState {
    dialogs: Array<Dialog>;
    messages: Array<Message>;
}
