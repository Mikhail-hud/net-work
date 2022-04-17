export const LIMIT = { key: "count", default: "5" };
export const PAGE = { key: "page", default: "1" };
export const SEARCH = { key: "term", default: "" };
export const FRIEND = { key: "friend", default: "false" };

export const INITIAL_PARAMS = {
    page: PAGE.default,
    count: LIMIT.default,
    friend: FRIEND.default,
};
