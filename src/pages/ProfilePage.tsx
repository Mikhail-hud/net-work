import React from "react";
import { Layout, Row, Col, Button, Tooltip } from "antd";
import { logo } from "../assets/img/common";
import { EditOutlined } from "@ant-design/icons";
import { useProfile } from "../hooks";
import { Preloader, ProfileStatus, ProfileDetails } from "../components";
import { UpdateLogoImg } from "../icons";

const { Content } = Layout;

const ProfilePage = () => {
    const { profile, isFetching, setEditMode, onMainPhotoSelected, onUpdateStatus, isOwner, status } = useProfile();

    if (isFetching) {
        return (
            <Content>
                <Preloader />
            </Content>
        );
    }
    return (
        <Content>
            <h1 style={{ textTransform: "capitalize" }}>{profile?.fullName}</h1>
            <Row className="profile-card">
                <Col style={{ position: "absolute", top: "18px", right: "20px" }}>
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
                <Col>
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
                <Col>{<ProfileStatus status={status} onUpdateStatus={onUpdateStatus} isOwner={isOwner} />}</Col>
            </Row>
            <Row>
                <ProfileDetails profile={profile} />
            </Row>
        </Content>
    );
};

export default ProfilePage;
