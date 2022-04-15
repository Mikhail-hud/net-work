import React from "react";
import { Layout } from "antd";
import Paginator from "../components/presentational/Paginator";
import { useUsers } from "../hooks/useUsers";
import Users from "../components/Users/Users";

const { Content } = Layout;

const UsersPage: React.FC = (): JSX.Element => {
    const { users, totalCount, isFetching, handleFollowUnfollow, followingInProgress, fetchFriends } = useUsers();
    return (
        <Content>
            <h1>Users</h1>
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

export default UsersPage;
