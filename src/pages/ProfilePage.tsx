import React from "react";
import { Layout } from "antd";
import { useProfile } from "../hooks";
import { Preloader } from "../components";

const { Content } = Layout;

const ProfilePage = () => {
    const { profile, isFetching } = useProfile();

    if (isFetching) {
        return <Preloader />;
    }
    return (
        <Content>
            <h1>Profile {profile?.fullName}</h1>
        </Content>
    );
};

export default ProfilePage;
