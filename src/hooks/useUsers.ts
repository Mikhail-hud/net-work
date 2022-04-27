import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { getSearchParams } from "../helpers/urlHelpers";
import { useAppDispatch, useAppSelector } from "./redux";
import { fetchUsers, follow, unFollow } from "../store/reducers/UsersSlice";
import { UsersQueryParameters } from "../types/usersType";
import { FRIENDS_PAGE_PATH } from "../constants/pathConstants";
import { FRIEND } from "../constants/usersConstants";

export const useUsers = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const fetchFriends = location.pathname === FRIENDS_PAGE_PATH;
    searchParams.append(FRIEND.key, String(fetchFriends));
    const { page, count, friend, term } = getSearchParams(searchParams);
    const { isFetching, users, totalCount, followingInProgress } = useAppSelector(state => state.usersReducer);
    const handleFollowUnfollow = (followed: boolean, userId: number) => {
        if (followed) {
            dispatch(unFollow(userId));
        } else {
            dispatch(follow(userId));
        }
    };

    useEffect(() => {
        if (term) {
            setSearchParams({ page, count, friend, term } as Record<keyof UsersQueryParameters, any>);
            return;
        }
        setSearchParams({ page, count, friend } as Record<keyof UsersQueryParameters, any>);
    }, [page, count, friend, term]);

    useEffect(() => {
        dispatch(fetchUsers({ page, count, friend, term }));
    }, [page, count, friend, term]);

    return {
        handleFollowUnfollow,
        isFetching,
        users,
        totalCount,
        followingInProgress,
        fetchFriends,
    };
};
