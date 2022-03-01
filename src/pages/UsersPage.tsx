import React from "react";
import { Layout, Row, Col, List, Button, Skeleton, Image, Avatar } from "antd";
import { UserDeleteOutlined, MessageOutlined, GithubOutlined, UserAddOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../assets/img/common/logo.png";
import Paginator from "../components/presentational/Paginator";
import { useUsers } from "../hooks/useUsers";

const { Content } = Layout;
const imgStyle = { width: 100, borderRadius: "50%" };
const avatarStyle = { width: "100px", height: "100px" };

const UsersPage: React.FC = (): JSX.Element => {
    const { users, totalCount, isFetching, handleFollowUnfollow } = useUsers();
    return (
        <Content>
            <h1>Users</h1>
            <Paginator isFetching={isFetching} totalItemsCount={totalCount} />
            <Row justify="center">
                <Col xs={24} sm={24} md={18} lg={14} xl={12} xxl={10}>
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={users}
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
        </Content>
    );
};

export default UsersPage;
