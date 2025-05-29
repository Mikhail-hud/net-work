import { Photos } from "./usersType";
import { BaseResponse } from "@app/types/apiTypes";

export interface NewMessageData {
    recipientId: number;
    body: string;
}

export interface DeleteRestoreMessageData {
    messageId: string;
    byRecipient: boolean;
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

export type NewMessageDataEntities = BaseResponse<{ message: Message }>;
export type DeleteMessageDataEntities = BaseResponse<Record<string, unknown>>;
export type SpamMessageDataEntities = BaseResponse<Record<string, unknown>>;
export type RestoreMessageDataEntities = BaseResponse<Record<string, unknown>>;
