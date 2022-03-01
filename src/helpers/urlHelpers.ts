export const getSearchParams = (entries, initialParams) => {
    const searchParams = { ...initialParams };
    for (const [key, value] of entries) {
        searchParams[key] = value;
    }
    return searchParams;
};
