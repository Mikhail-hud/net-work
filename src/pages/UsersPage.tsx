import { FC } from "react";
import { useUsers } from "@hooks";
import { Col, Layout, Row, Typography } from "antd";
import { Paginator, Search, UsersList } from "@components";

const { Content } = Layout;

export const UsersPage: FC = () => {
    const { users, totalCount, isFetching, handleFollowUnfollow, followingInProgress, isFriendsFetched, params } =
        useUsers();
    return (
        <Content>
            <Row justify="space-between" style={{ marginBottom: "1rem" }}>
                <Col>
                    <Typography.Title level={4}>Users</Typography.Title>
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
            <UsersList
                users={users}
                isFetching={isFetching}
                followingInProgress={followingInProgress}
                handleFollowUnfollow={handleFollowUnfollow}
            />
        </Content>
    );
};
