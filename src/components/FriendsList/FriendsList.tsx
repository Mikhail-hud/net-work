import React from "react";
import { NavLink } from "react-router-dom";
import { Card, Row, Col, Button, Popconfirm } from "antd";
import { GithubOutlined, UserDeleteOutlined, MessageOutlined, UserAddOutlined } from "@ant-design/icons";
import { logo } from "../../assets/img/common";
import { NetWorkUser } from "../../types/usersType";

const { Meta } = Card;

interface Props {
    isFetching: boolean;
    users: Array<NetWorkUser>;
    handleFollowUnfollow: (followed: boolean, userId: number) => void;
    followingInProgress: Array<number>;
}

const FriendsList: React.FC<Props> = ({
    isFetching,
    users,
    handleFollowUnfollow,
    followingInProgress,
}): JSX.Element => {
    return (
        <Row justify="center">
            {users.map(friend => {
                return (
                    <Col
                        xs={24}
                        sm={24}
                        md={12}
                        lg={8}
                        xl={6}
                        style={{ display: "flex", justifyContent: "space-around" }}
                        key={friend.id}
                    >
                        <Card
                            className="friend-card"
                            loading={isFetching}
                            hoverable
                            size="small"
                            style={{
                                maxWidth: "200px",
                                marginBottom: "2rem",
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: "column",
                            }}
                            cover={
                                !isFetching && (
                                    <NavLink to={`/profile/` + friend?.id}>
                                        <img alt="logo" src={friend?.photos?.large ?? logo} />
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
                                            type="dashed"
                                            shape="round"
                                            disabled={followingInProgress.some(id => id === friend?.id)}
                                            icon={friend?.followed ? <UserDeleteOutlined /> : <UserAddOutlined />}
                                        />
                                    </Popconfirm>
                                ) : (
                                    <Button
                                        type="dashed"
                                        onClick={() => handleFollowUnfollow(friend?.followed, friend?.id)}
                                        shape="round"
                                        disabled={followingInProgress.some(id => id === friend?.id)}
                                        icon={friend?.followed ? <UserDeleteOutlined /> : <UserAddOutlined />}
                                    />
                                ),

                                <NavLink key={friend.id} to={`/dialogs/${friend?.id}`}>
                                    <Button type="dashed" shape="round" icon={<MessageOutlined />} />
                                </NavLink>,
                                <Button key={friend.id} type="dashed" shape="round" icon={<GithubOutlined />} />,
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

export default FriendsList;
