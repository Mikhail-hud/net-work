import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { getSearchParams } from "../helpers/urlHelpers";
import { useAppDispatch, useAppSelector } from "./redux";
import { fetchUsers, follow, unFollow } from "../store/reducers/UsersSlice";
import { FRIENDS_PAGE_PATH } from "../constants/pathConstants";

export const useUsers = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const isFriendsFetched = location.pathname === FRIENDS_PAGE_PATH;
    const params = getSearchParams(searchParams);
    const { page, count, term } = params;

    const { isFetching, users, totalCount, followingInProgress } = useAppSelector(state => state.usersReducer);

    const handleFollowUnfollow = (followed: boolean, userId: number) => {
        if (followed) {
            dispatch(unFollow(userId));
        } else {
            dispatch(follow(userId));
        }
    };
    useEffect(() => {
        dispatch(fetchUsers({ page, count, friend: isFriendsFetched, term }));
    }, [page, count, isFriendsFetched, term]);

    return {
        handleFollowUnfollow,
        isFetching,
        users,
        totalCount,
        params,
        followingInProgress,
        isFriendsFetched,
    };
};
