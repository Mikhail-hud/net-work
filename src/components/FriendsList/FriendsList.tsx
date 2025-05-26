import { FC } from "react";
import { NavLink } from "react-router-dom";
import { logo } from "@assets/img/common";
import { NetWorkUser } from "@app/types/usersType";
import { Card, Row, Col, Button, Popconfirm } from "antd";
import { GithubOutlined, UserDeleteOutlined, MessageOutlined, UserAddOutlined } from "@ant-design/icons";

const { Meta } = Card;

interface FriendsListProps {
    isFetching: boolean;
    users: Array<NetWorkUser>;
    handleFollowUnfollow: (followed: boolean, userId: number) => void;
    followingInProgress: Array<number>;
}

export const FriendsList: FC<FriendsListProps> = ({ isFetching, users, handleFollowUnfollow, followingInProgress }) => {
    return (
        <Row justify="center" gutter={[16, 16]}>
            {users.map(friend => {
                return (
                    <Col xs={24} sm={24} md={12} lg={8} xl={6} key={friend.id}>
                        <Card
                            loading={isFetching}
                            hoverable
                            size="small"
                            style={{
                                width: "200px",
                                marginBottom: "2rem",
                            }}
                            cover={
                                !isFetching && (
                                    <NavLink to={`/profile/` + friend?.id}>
                                        <img
                                            alt="logo"
                                            style={{ maxWidth: "200px" }}
                                            src={friend?.photos?.large ?? logo}
                                        />
                                    </NavLink>
                                )
                            }
                            actions={[
                                friend?.followed ? (
                                    <Popconfirm
                                        key={friend.id}
                                        title={`Are you sure to delete ${friend?.name}?`}
                                        onConfirm={() => handleFollowUnfollow(friend?.followed, friend?.id)}
                                        okText="Delete"
                                        cancelText="No way!"
                                    >
                                        <Button
                                            type="text"
                                            disabled={followingInProgress.some(id => id === friend?.id)}
                                            icon={friend?.followed ? <UserDeleteOutlined /> : <UserAddOutlined />}
                                        />
                                    </Popconfirm>
                                ) : (
                                    <Button
                                        type="text"
                                        onClick={() => handleFollowUnfollow(friend?.followed, friend?.id)}
                                        disabled={followingInProgress.some(id => id === friend?.id)}
                                        icon={friend?.followed ? <UserDeleteOutlined /> : <UserAddOutlined />}
                                    />
                                ),

                                <NavLink key={friend.id} to={`/dialogs/` + friend?.id}>
                                    <Button type="text" shape="round" icon={<MessageOutlined />} />
                                </NavLink>,
                                <Button key={friend.id} type="text" shape="round" icon={<GithubOutlined />} />,
                            ]}
                        >
                            <Meta title={friend?.name} description={friend?.status} />
                        </Card>
                    </Col>
                );
            })}
        </Row>
    );
};
