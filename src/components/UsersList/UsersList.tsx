import { Avatar, Button, Col, Image, List, Row, Skeleton, Drawer } from "antd";
import { ProfileOutlined, MessageOutlined, UserAddOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { logo } from "../../assets/img/common";
import React, { useState } from "react";
import { NetWorkUser } from "../../types/usersType";
import { DIALOGS_PAGE_PATH, PROFILE_PAGE_PATH } from "../../constants/pathConstants";
import { useProfile } from "../../hooks";
import { PageLoader, ProfileDetails } from "../../components";
import { DRAWER_INNER_WINDOW_WIDTH } from "../../constants/profileConstans";

const imgStyle = { width: 100, borderRadius: "50%" };
const avatarStyle = { width: "100px", height: "100px" };

interface Props {
    isFetching: boolean;
    users: Array<NetWorkUser>;
    handleFollowUnfollow: (followed: boolean, userId: number) => void;
    followingInProgress: Array<number>;
}

const UsersList: React.FC<Props> = ({ isFetching, users, handleFollowUnfollow, followingInProgress }): JSX.Element => {
    const [showDrawer, setShowDrawer] = useState(false);
    const { isFetching: isProfileFetching, user, profile, getUserProfileData, status } = useProfile();

    const onUserDetailsClick = (showDrawer: boolean, userId: number): void => {
        setShowDrawer(showDrawer);
        getUserProfileData(userId);
    };

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
                                    <Button
                                        type="dashed"
                                        shape="round"
                                        onClick={() => onUserDetailsClick(true, userItem?.id)}
                                        key={userItem?.id}
                                        icon={<ProfileOutlined />}
                                    >
                                        Profile
                                    </Button>,
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
                            <Drawer
                                title="Profile"
                                width={window.innerWidth >= DRAWER_INNER_WINDOW_WIDTH ? "70%" : "100%"}
                                placement="right"
                                closable
                                onClose={() => setShowDrawer(false)}
                                visible={showDrawer}
                            >
                                {isProfileFetching ? (
                                    <PageLoader />
                                ) : (
                                    <>
                                        <Row className="profile-card">
                                            <img src={profile?.photos?.large ?? logo} alt="avatar" />
                                            {status && (
                                                <Col span={24} className="status">
                                                    <p>{status}</p>
                                                </Col>
                                            )}
                                        </Row>
                                        <Row>
                                            <ProfileDetails profile={profile} />
                                        </Row>
                                    </>
                                )}
                            </Drawer>
                        </List.Item>
                    )}
                />
            </Col>
        </Row>
    );
};
export default UsersList;
