import React from "react";
import { Layout } from "antd";
import { useProfile } from "../hooks";

const { Content } = Layout;

const ProfilePage = () => {
    const { profile } = useProfile();
    return (
        <Content>
            <h1>Profile {profile?.fullName}</h1>
        </Content>
    );
};

export default ProfilePage;
