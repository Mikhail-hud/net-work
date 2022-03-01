import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useFetchUsersQuery } from "../services/UsersService";
import { INITIAL_PARAMS } from "../constants/usersConstants";
import { getSearchParams } from "../helpers/urlHelpers";

export const useUsers = () => {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams(location.search);
    const params = getSearchParams(searchParams, INITIAL_PARAMS);
    const { data, isFetching } = useFetchUsersQuery({ ...params });
    const users = data?.items ?? [];
    const totalCount = data?.totalCount;

    const handleFollowUnfollow = (followed: boolean, id: number): void => {
        console.log(followed, id);
    };
    useEffect(() => {
        const { page, count, friend } = params as Record<string, any>;
        setSearchParams({ page, count, friend });
    }, []);
    return {
        handleFollowUnfollow,
        isFetching,
        users,
        totalCount,
    };
};
