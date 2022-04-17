import React from "react";
import { Layout, Row, Col } from "antd";
import { useUsers } from "../hooks";
import { Paginator, UsersList, Search } from "../components";

const { Content } = Layout;
const FriendsPage: React.FC = (): JSX.Element => {
    const { users, totalCount, isFetching, handleFollowUnfollow, followingInProgress, fetchFriends } = useUsers();
    return (
        <Content>
            <Row justify="space-between" style={{ marginBottom: "1rem" }}>
                <Col>
                    <h1>Friends</h1>
                </Col>
                <Col>
                    <Search fetchFriends={fetchFriends} />
                </Col>
            </Row>
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
