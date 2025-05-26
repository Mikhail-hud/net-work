import { FC } from "react";
import { useUsers } from "@hooks";
import { Layout, Row, Col, Typography } from "antd";
import { FriendsList, Paginator, Search } from "@components";

const { Content } = Layout;
export const FriendsPage: FC = () => {
    const { users, totalCount, isFetching, handleFollowUnfollow, followingInProgress, isFriendsFetched, params } =
        useUsers();

    return (
        <Content>
            <Row justify="space-between" style={{ marginBottom: "1rem" }}>
                <Col>
                    <Typography.Title level={4}>Friends</Typography.Title>
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
            <FriendsList
                users={users}
                isFetching={isFetching}
                followingInProgress={followingInProgress}
                handleFollowUnfollow={handleFollowUnfollow}
            />
        </Content>
    );
};
