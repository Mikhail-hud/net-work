import { BaseResponse } from "@app/types/apiTypes";

export interface UsersQueryParameters {
    count: number | string;
    page: number | string;
    friend?: boolean | string;
    term?: string;
}

export interface ToggleFollowingProgressPayload {
    isFetching: boolean;
    userId: number;
}

export interface Photos {
    small: string;
    large: string;
}

export interface NetWorkUser {
    followed: boolean;
    id: number;
    name: string;
    photos: Photos;
    status: string;
    uniqueUrlName: string;
}

export interface UsersDataEntities {
    error: string[];
    items: Array<NetWorkUser>;
    totalCount: number;
}

export type FollowUnFollowDataEntities = BaseResponse<Record<string, unknown>>;
