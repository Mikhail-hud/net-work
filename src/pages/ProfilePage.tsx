import { useProfile } from "@hooks";
import { logo } from "@assets/img/common";
import { UpdateLogoImg } from "@app/icons";
import { EditOutlined } from "@ant-design/icons";
import { Layout, Row, Col, Button, Tooltip, Divider, Avatar, Typography } from "antd";
import { PageLoader, ProfileStatus, PostForm, PostsElements, ProfileDataForm, ProfileDetails } from "@components";

const { Content } = Layout;

export const ProfilePage = () => {
    const {
        profile,
        isFetching,
        isOwner,
        status,
        posts,
        user,
        editMode,
        isProfileSaving,
        profileDataFormError,
        onSetEditMode,
        onMainPhotoSelected,
        onStatusUpdate,
        onLikeAdd,
        onAddPost,
        onPostDelete,
        onPostUpdate,
    } = useProfile();

    if (isFetching) {
        return (
            <Content>
                <PageLoader isHeaderShown />
            </Content>
        );
    }

    return (
        <Content>
            <Row className="profile-header">
                <Col>
                    <Typography.Title level={4}>{profile?.fullName}</Typography.Title>
                </Col>
                <Col>
                    {isOwner && (
                        <Button type="text" shape="round" icon={<EditOutlined />} onClick={() => onSetEditMode(true)}>
                            Edit profile!
                        </Button>
                    )}
                </Col>
            </Row>
            <Row className="profile-info">
                <Col span={24}>
                    <Row className="profile-card">
                        <Col span={24}>
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
                            {isOwner && (
                                <Tooltip title="Upload your photo!">
                                    <label>
                                        <UpdateLogoImg />
                                        <input type="file" onChange={onMainPhotoSelected} />
                                    </label>
                                </Tooltip>
                            )}
                        </Col>
                        <ProfileStatus status={status} onStatusUpdate={onStatusUpdate} isOwner={isOwner} />
                    </Row>
                    <Row>
                        <ProfileDataForm
                            profileDataFormError={profileDataFormError}
                            profile={profile}
                            editMode={editMode}
                            onSetEditMode={onSetEditMode}
                            isProfileSaving={isProfileSaving}
                        />
                        <ProfileDetails profile={profile} isOwner={isOwner} />
                    </Row>
                    <Divider orientation="left" variant="solid">
                        <Typography.Title level={4}>{isOwner ? "My posts" : "Posts"}</Typography.Title>
                    </Divider>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24}>
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
