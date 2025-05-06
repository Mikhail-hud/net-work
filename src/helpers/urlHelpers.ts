import { INITIAL_PARAMS } from "../constants/usersConstants";
import { UsersQueryParameters } from "../types/usersType";

export const getSearchParams = (entries: URLSearchParams) => {
    const searchParams = { ...INITIAL_PARAMS };
    for (const [key, value] of entries) {
        searchParams[key] = value;
    }
    return searchParams as UsersQueryParameters;
};
