import React from "react";
import { Layout, Row, Col, Button, Tooltip } from "antd";
import { logo } from "../assets/img/common";
import { EditOutlined } from "@ant-design/icons";
import { useProfile } from "../hooks";
import { Preloader, ProfileStatus, ProfileDetails, PostForm, PostsElements } from "../components";
import { UpdateLogoImg } from "../icons";

const { Content } = Layout;

const ProfilePage = () => {
    const {
        profile,
        isFetching,
        isOwner,
        status,
        posts,
        user,
        setEditMode,
        onMainPhotoSelected,
        onStatusUpdate,
        onLikeAdd,
        onAddPost,
        onPostDelete,
        onPostUpdate,
        postsRef,
    } = useProfile();

    if (isFetching) {
        return (
            <Content>
                <Preloader />
            </Content>
        );
    }

    return (
        <Content>
            <Row className="profile-header" gutter={[10, 0]}>
                <Col>
                    <h1>{profile?.fullName}</h1>
                </Col>
                <Col>
                    {isOwner && (
                        <Button
                            type="primary"
                            shape="round"
                            icon={<EditOutlined />}
                            onClick={() => {
                                setEditMode(true);
                            }}
                        >
                            Edit profile!
                        </Button>
                    )}
                </Col>
            </Row>
            <Row className="profile-info">
                <Col span={24}>
                    <Row className="profile-card">
                        <Col span={24}>
                            <img src={profile?.photos?.large ?? logo} alt="avatar" />
                            {isOwner && (
                                <Tooltip title="Upload your photo!">
                                    <label>
                                        <UpdateLogoImg />
                                        <input type="file" onChange={onMainPhotoSelected} />
                                    </label>
                                </Tooltip>
                            )}
                        </Col>
                        <Col span={24}>
                            {<ProfileStatus status={status} onStatusUpdate={onStatusUpdate} isOwner={isOwner} />}
                        </Col>
                    </Row>
                    <Row>
                        <ProfileDetails profile={profile} />
                    </Row>
                    <h2>My posts</h2>
                </Col>
            </Row>
            <Row>
                <Col className="thinScrollBar" ref={postsRef} xs={24} style={{ maxHeight: "46vh", overflow: "auto" }}>
                    <PostsElements
                        onPostUpdate={onPostUpdate}
                        user={user}
                        posts={posts}
                        onLikeAdd={onLikeAdd}
                        isOwner={isOwner}
                        onPostDelete={onPostDelete}
                    />
                </Col>
                <Col xs={24}>
                    <PostForm onAddPost={onAddPost} user={user} />
                </Col>
            </Row>
        </Content>
    );
};

export default ProfilePage;
