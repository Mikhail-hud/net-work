import React from "react";
import { Layout, Row, Col, Skeleton } from "antd";
import { UsersDialogs, Messages, MessageForm } from "../components";
import { useDialogs, useMessanger, useProfile } from "../hooks";

const { Content } = Layout;

const MessangerPage: React.FC = (): JSX.Element => {
    const { dialogs, isFetchingDialogs } = useDialogs();
    const { user, profile, isFetching } = useProfile();
    const { messages, onSendMessage, userId } = useMessanger();
    return (
        <Content>
            <h1>{isFetching ? <Skeleton.Button active /> : profile?.fullName}</h1>
            <Row justify="space-between">
                <Col xs={24} sm={24}>
                    <UsersDialogs dialogs={dialogs} isFetchingDialogs={isFetchingDialogs} />
                </Col>
                <Col xs={24} sm={20} style={{ maxWidth: "950px", margin: "0 auto" }}>
                    <Messages messages={messages} />
                    <MessageForm onSendMessage={onSendMessage} user={user} userId={userId} />
                </Col>
            </Row>
        </Content>
    );
};

export default MessangerPage;
