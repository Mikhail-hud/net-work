import { useEffect } from "react";
import { getSearchParams } from "@app/helpers/urlHelpers";
import { FRIENDS_PAGE_PATH } from "@constants/pathConstants";
import { useLocation, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@app/hooks/redux";
import { fetchUsers, follow, unFollow } from "@app/store/reducers/UsersSlice";

export const useUsers = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const isFriendsFetched = location.pathname === FRIENDS_PAGE_PATH;
    const params = getSearchParams(searchParams);
    const { page, count, term } = params;

    const { isFetching, users, totalCount, followingInProgress } = useAppSelector(state => state.usersReducer);

    const handleFollowUnfollow = (followed: boolean, userId: number): void => {
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
