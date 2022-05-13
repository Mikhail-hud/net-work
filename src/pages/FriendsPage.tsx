import React from "react";
import { Layout, Row, Col } from "antd";
import { useUsers } from "../hooks";
import { Paginator, Search, FriendList } from "../components";

const { Content } = Layout;
const FriendsPage: React.FC = (): JSX.Element => {
    const { users, totalCount, isFetching, handleFollowUnfollow, followingInProgress, isFriendsFetched, params } =
        useUsers();
    return (
        <Content>
            <Row justify="space-between" style={{ marginBottom: "1rem" }}>
                <Col>
                    <h1>Friends</h1>
                </Col>
                <Col>
                    <Search params={params} isFriendsFetched={isFriendsFetched} />
                </Col>
            </Row>
            <Paginator
                params={params}
                isFetching={isFetching}
                totalItemsCount={totalCount}
                isFriendsFetched={isFriendsFetched}
            />
            <FriendList
                users={users}
                isFetching={isFetching}
                followingInProgress={followingInProgress}
                handleFollowUnfollow={handleFollowUnfollow}
            />
        </Content>
    );
};

export default FriendsPage;
