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
    error: Array<string>;
    items: Array<NetWorkUser>;
    totalCount: number;
}
