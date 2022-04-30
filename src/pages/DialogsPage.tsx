import React from "react";
import { Layout, Row, Col } from "antd";
import { UsersDialogs, Messages, MessageForm } from "../components";
import { useDialogs } from "../hooks";

const { Content } = Layout;

const DialogsPage: React.FC = (): JSX.Element => {
    const { dialogs, messages, onSendMessage, user } = useDialogs();
    return (
        <Content>
            <h1>Dialogs</h1>
            <Row justify="space-between">
                <Col xs={24} sm={24}>
                    <UsersDialogs dialogs={dialogs} />
                </Col>
                <Col xs={24} sm={20} style={{ maxWidth: "950px", margin: "0 auto" }}>
                    <Messages messages={messages} />
                    <MessageForm onSendMessage={onSendMessage} user={user} />
                </Col>
            </Row>
        </Content>
    );
};

export default DialogsPage;
