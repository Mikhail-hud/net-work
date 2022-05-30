import { UserProfile } from "./profileTypes";
import { Photos } from "./usersType";

export interface NewMessageData {
    message: string;
    profile: UserProfile;
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

export interface Message extends NewMessageData {
    id: number;
}
