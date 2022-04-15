import React from "react";
import { Layout } from "antd";
import { useUsers } from "../hooks/useUsers";
import Paginator from "../components/presentational/Paginator";
import Users from "../components/Users/Users";

const { Content } = Layout;
const FriendsPage: React.FC = (): JSX.Element => {
    const { users, totalCount, isFetching, handleFollowUnfollow, followingInProgress, fetchFriends } = useUsers();
    return (
        <Content>
            <h1>Friends</h1>
            <Paginator isFetching={isFetching} totalItemsCount={totalCount} fetchFriends={fetchFriends} />
            <Users
                users={users}
                isFetching={isFetching}
                followingInProgress={followingInProgress}
                handleFollowUnfollow={handleFollowUnfollow}
            />
        </Content>
    );
};

export default FriendsPage;
