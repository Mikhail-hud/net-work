import { UsersQueryParameters } from "../types/usersType";

export const LIMIT = { key: "count", default: "5" };
export const PAGE = { key: "page", default: "1" };
export const SEARCH = { key: "search", default: "" };
export const FRIEND = { key: "friend", default: false };

export const INITIAL_PARAMS: UsersQueryParameters = {
    page: PAGE.default,
    count: LIMIT.default,
    friend: FRIEND.default,
};
