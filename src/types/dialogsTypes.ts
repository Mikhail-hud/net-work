import { Photos } from "./usersType";

export interface NewMessageData {
    recipientId: number;
    body: string;
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
    addedAt: string;
    body: string;
    id: string;
    recipientId: number;
    senderId: number;
    senderName: string;
    translatedBody: string;
    viewed: boolean;
    isSpam?: boolean;
    deletedByRecipient?: boolean;
    deletedBySender?: boolean;
    distributionId?: number;
    recipientName?: string;
}
export interface MessagesDataEntities {
    error: Array<string>;
    items: Array<Message>;
    totalCount: number;
}
