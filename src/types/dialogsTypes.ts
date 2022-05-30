import { UserProfile } from "./profileTypes";
import { Photos } from "./usersType";

export interface NewMessageData {
    message: string;
    userId: number;
    profile?: UserProfile;
}
export interface Dialog {
    hasNewMessages: boolean;
    id: number;
    lastDialogActivityDate: string;
    lastUserActivityDate: string;
    newMessagesCount: number;
    photos: Photos;
    userName: string;
}
export interface Message {
    message: string;
    id: number;
    profile?: UserProfile;
}
export interface MessagesDataEntities {
    error: Array<string>;
    items: Array<Message>;
    totalCount: number;
}
