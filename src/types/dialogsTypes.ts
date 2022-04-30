import { UserProfile } from "./profileTypes";

export interface NewMessageData {
    message: string;
    profile: UserProfile;
}
export interface Dialog {
    id: number;
    profile: UserProfile;
}

export interface Message extends NewMessageData {
    id: number;
}
