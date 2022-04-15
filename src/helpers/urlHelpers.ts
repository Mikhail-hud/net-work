import { INITIAL_PARAMS } from "../constants/usersConstants";

export const getSearchParams = entries => {
    const searchParams = { ...INITIAL_PARAMS };
    for (const [key, value] of entries) {
        searchParams[key] = value;
    }
    return searchParams;
};
