import React from "react";
import { Col, Layout, Row } from "antd";
import { Paginator, Search, UsersList } from "../components";
import { useUsers } from "../hooks";

const { Content } = Layout;

const UsersPage: React.FC = (): JSX.Element => {
    const { users, totalCount, isFetching, handleFollowUnfollow, followingInProgress, fetchFriends } = useUsers();
    return (
        <Content>
            <Row justify="space-between" style={{ marginBottom: "1rem" }}>
                <Col>
                    <h1>Users</h1>
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

export default UsersPage;
