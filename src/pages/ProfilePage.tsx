import React from "react";
import { Layout } from "antd";
import { useParams } from "react-router-dom";
const { Content } = Layout;

const ProfilePage = () => {
    const { userId } = useParams();
    return (
        <Content>
            <h1>Profile {userId}</h1>
        </Content>
    );
};

export default ProfilePage;
