import { FC } from "react";
import { Layout, Row, Col, Skeleton, Typography } from "antd";
import { useDialogs, useMessanger, useProfile } from "@hooks";
import { UsersDialogs, Messages, MessageForm } from "@components";

const { Content } = Layout;

export const MessangerPage: FC = () => {
    const { dialogs, isFetchingDialogs } = useDialogs();
    const { user, profile, isFetching } = useProfile();
    const {
        messages,
        onSendMessage,
        userId,
        isFetchingMessages,
        totalMessagesCount,
        onDeleteMessage,
        onMarkMessageAsSpam,
        onRestoreMessage,
    } = useMessanger();
    return (
        <Content>
            <Typography.Title style={{ marginBottom: "1rem" }} level={4}>
                {isFetching ? <Skeleton.Button active /> : profile?.fullName}
            </Typography.Title>
            <Row justify="space-between">
                <Col xs={24} sm={24}>
                    <UsersDialogs dialogs={dialogs} isFetchingDialogs={isFetchingDialogs} />
                </Col>
                <Col xs={24} sm={20} style={{ maxWidth: "950px", margin: "0 auto" }}>
                    <Messages
                        onRestoreMessage={onRestoreMessage}
                        onMarkMessageAsSpam={onMarkMessageAsSpam}
                        onDeleteMessage={onDeleteMessage}
                        user={user}
                        messages={messages}
                        profile={profile}
                        userId={userId}
                        totalMessagesCount={totalMessagesCount}
                        isFetchingMessages={isFetchingMessages}
                    />
                    <MessageForm onSendMessage={onSendMessage} user={user} userId={userId} />
                </Col>
            </Row>
        </Content>
    );
};
