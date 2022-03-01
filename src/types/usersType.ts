export interface UsersQueryParameters {
    count: string;
    page: string;
    search?: string;
    friend?: boolean;
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
