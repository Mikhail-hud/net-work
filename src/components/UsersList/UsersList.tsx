import { Avatar, Button, Col, Image, List, Row, Skeleton } from "antd";
import { GithubOutlined, MessageOutlined, UserAddOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { logo } from "../../assets/img/common";
import React from "react";
import { NetWorkUser } from "../../types/usersType";
import { DIALOGS_PAGE_PATH, PROFILE_PAGE_PATH } from "../../constants/pathConstants";
import { useAppSelector } from "../../hooks";

const imgStyle = { width: 100, borderRadius: "50%" };
const avatarStyle = { width: "100px", height: "100px" };

interface Props {
    isFetching: boolean;
    users: Array<NetWorkUser>;
    handleFollowUnfollow: (followed: boolean, userId: number) => void;
    followingInProgress: Array<number>;
}

const UsersList: React.FC<Props> = ({ isFetching, users, handleFollowUnfollow, followingInProgress }): JSX.Element => {
    const { user } = useAppSelector(state => state.authReducer);
    return (
        <Row justify="center">
            <Col xs={24} sm={24} md={18} lg={14} xl={12} xxl={10}>
                <List
                    className="user-list"
                    itemLayout="vertical"
                    size="large"
                    dataSource={users}
                    loading={isFetching}
                    renderItem={userItem => (
                        <List.Item
                            key={userItem.id}
                            actions={
                                !isFetching &&
                                user?.id !== userItem?.id && [
                                    <Button
                                        onClick={() => handleFollowUnfollow(userItem?.followed, userItem?.id)}
                                        type="dashed"
                                        shape="round"
                                        key={userItem?.id}
                                        loading={followingInProgress.some(id => id === userItem.id)}
                                        icon={userItem?.followed ? <UserDeleteOutlined /> : <UserAddOutlined />}
                                    >
                                        {userItem?.followed ? "Unfollow" : "Follow"}
                                    </Button>,
                                    <Button type="dashed" shape="round" key={userItem?.id} icon={<GithubOutlined />} />,
                                    <Link to={DIALOGS_PAGE_PATH} key={userItem?.id}>
                                        <Button type="dashed" shape="round" icon={<MessageOutlined />} />
                                    </Link>,
                                ]
                            }
                            extra={
                                !isFetching && (
                                    <Avatar
                                        style={avatarStyle}
                                        src={<Image src={userItem?.photos?.large ?? logo} style={imgStyle} />}
                                    />
                                )
                            }
                        >
                            <Skeleton loading={isFetching} active>
                                <List.Item.Meta
                                    title={
                                        <Link
                                            to={
                                                user?.id === userItem?.id
                                                    ? PROFILE_PAGE_PATH
                                                    : `/profile/` + userItem?.id
                                            }
                                        >
                                            {userItem?.name}
                                        </Link>
                                    }
                                    description={userItem?.status}
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
