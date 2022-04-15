import React from "react";
import { Layout } from "antd";
import { useUsers } from "../hooks";
import { Paginator, UsersList } from "../components";

const { Content } = Layout;
const FriendsPage: React.FC = (): JSX.Element => {
    const { users, totalCount, isFetching, handleFollowUnfollow, followingInProgress, fetchFriends } = useUsers();
    return (
        <Content>
            <h1>Friends</h1>
            <Paginator isFetching={isFetching} totalItemsCount={totalCount} fetchFriends={fetchFriends} />
            <UsersList
                users={users}
                isFetching={isFetching}
                followingInProgress={followingInProgress}
                handleFollowUnfollow={handleFollowUnfollow}
            />
        </Content>
    );
};

export default FriendsPage;
