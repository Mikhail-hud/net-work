import { FC } from "react";
import { useUsers } from "@hooks";
import { Layout, Row, Col } from "antd";

import { FriendList, Paginator, Search } from "@components";

const { Content } = Layout;
export const FriendsPage: FC = (): JSX.Element => {
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
