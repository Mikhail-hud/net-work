import { Avatar, Button, Col, Image, List, Row, Skeleton } from "antd";
import { GithubOutlined, MessageOutlined, UserAddOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../../assets/img/common/logo.png";
import React from "react";
import { NetWorkUser } from "../../types/usersType";

const imgStyle = { width: 100, borderRadius: "50%" };
const avatarStyle = { width: "100px", height: "100px" };

interface Props {
    isFetching: boolean;
    users: Array<NetWorkUser>;
    handleFollowUnfollow: (followed: boolean, userId: number) => void;
    followingInProgress: Array<number>;
}

const UsersList: React.FC<Props> = ({ isFetching, users, handleFollowUnfollow, followingInProgress }): JSX.Element => {
    return (
        <Row justify="center">
            <Col xs={24} sm={24} md={18} lg={14} xl={12} xxl={10}>
                <List
                    className="user-list"
                    itemLayout="vertical"
                    size="large"
                    dataSource={users}
                    loading={isFetching}
                    renderItem={user => (
                        <List.Item
                            key={user.id}
                            actions={
                                !isFetching && [
                                    <Button
                                        onClick={() => handleFollowUnfollow(user?.followed, user?.id)}
                                        type="dashed"
                                        shape="round"
                                        key={user?.id}
                                        loading={followingInProgress.some(id => id === user.id)}
                                        icon={user?.followed ? <UserDeleteOutlined /> : <UserAddOutlined />}
                                    >
                                        {user?.followed ? "Unfollow" : "Follow"}
                                    </Button>,
                                    <Button
                                        type="dashed"
                                        shape="round"
                                        disabled={true}
                                        key={user?.id}
                                        icon={<GithubOutlined />}
                                    />,
                                    <Link to={`/dialogs`} key={user?.id}>
                                        <Button
                                            type="dashed"
                                            shape="round"
                                            disabled={true}
                                            icon={<MessageOutlined />}
                                        />
                                    </Link>,
                                ]
                            }
                            extra={
                                !isFetching && (
                                    <Avatar
                                        style={avatarStyle}
                                        src={<Image src={user?.photos?.large ?? logo} style={imgStyle} />}
                                    />
                                )
                            }
                        >
                            <Skeleton loading={isFetching} active>
                                <List.Item.Meta
                                    title={<Link to={`/profile/` + user?.id}>{user?.name}</Link>}
                                    description={user?.status}
                                />
                            </Skeleton>
                        </List.Item>
                    )}
                />
            </Col>
        </Row>
    );
};
export default UsersList;
