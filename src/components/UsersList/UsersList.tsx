import { useProfile } from "@hooks";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { logo } from "@assets/img/common";
import { NetWorkUser } from "@app/types/usersType";
import { PageLoader, ProfileDetails } from "@components";
import { PROFILE_PAGE_PATH } from "@constants/pathConstants";
import { DRAWER_INNER_WINDOW_WIDTH } from "@constants/profileConstans";
import { Avatar, Button, Col, Image, List, Row, Skeleton, Drawer } from "antd";
import { ProfileOutlined, MessageOutlined, UserAddOutlined, UserDeleteOutlined } from "@ant-design/icons";

interface UsersListProps {
    isFetching: boolean;
    users: Array<NetWorkUser>;
    handleFollowUnfollow: (followed: boolean, userId: number) => void;
    followingInProgress: Array<number>;
}

export const UsersList: FC<UsersListProps> = ({ isFetching, users, handleFollowUnfollow, followingInProgress }) => {
    const [showDrawer, setShowDrawer] = useState(false);
    const { isFetching: isProfileFetching, user, profile, getUserProfileData, status, isOwner } = useProfile();

    const onUserDetailsClick = (showDrawer: boolean, userId: number): void => {
        setShowDrawer(showDrawer);
        getUserProfileData(userId);
    };

    return (
        <Row justify="center">
            <Col xs={24} sm={24} md={18} lg={14} xl={12} xxl={10}>
                <List
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
                                        type="text"
                                        key={userItem?.id}
                                        loading={followingInProgress.some(id => id === userItem.id)}
                                        icon={userItem?.followed ? <UserDeleteOutlined /> : <UserAddOutlined />}
                                    >
                                        {userItem?.followed ? "Unfollow" : "Follow"}
                                    </Button>,
                                    <Button
                                        type="text"
                                        onClick={() => onUserDetailsClick(true, userItem?.id)}
                                        key={userItem?.id}
                                        icon={<ProfileOutlined />}
                                    >
                                        Profile
                                    </Button>,
                                    <Link to={`/dialogs/` + userItem?.id} key={userItem?.id}>
                                        <Button type="text" shape="round" icon={<MessageOutlined />} />
                                    </Link>,
                                ]
                            }
                            extra={
                                !isFetching && (
                                    <Avatar
                                        size={{
                                            xs: 80,
                                            sm: 80,
                                            md: 80,
                                            lg: 100,
                                            xl: 100,
                                            xxl: 100,
                                        }}
                                        src={<Image src={userItem?.photos?.large ?? logo} />}
                                    />
                                )
                            }
                        >
                            <Skeleton loading={isFetching} active>
                                <List.Item.Meta
                                    title={
                                        <Link
                                            style={{ textTransform: "capitalize" }}
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
                                open={showDrawer}
                            >
                                {isProfileFetching ? (
                                    <PageLoader />
                                ) : (
                                    <>
                                        <Row className="profile-card">
                                            <Avatar
                                                size={{
                                                    xs: 150,
                                                    sm: 300,
                                                    md: 300,
                                                    lg: 300,
                                                    xl: 300,
                                                    xxl: 300,
                                                }}
                                                src={profile?.photos?.large ?? logo}
                                                alt="avatar"
                                            />
                                            {status && (
                                                <Col span={24} className="status">
                                                    <p>{status}</p>
                                                </Col>
                                            )}
                                        </Row>
                                        <Row>
                                            <ProfileDetails isOwner={isOwner} profile={profile} />
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
