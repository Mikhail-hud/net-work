import React, { useEffect, useRef } from "react";
import { logo } from "../../assets/img/common";
import { Row, Col, Tooltip, Typography, Dropdown, Menu, Button } from "antd";
import { CheckCircleTwoTone, DeleteTwoTone, MessageTwoTone, MoreOutlined } from "@ant-design/icons";
import { DeleteRestoreMessageData, Message } from "../../types/dialogsTypes";
import { UserProfile } from "../../types/profileTypes";
import { MessangerLoader } from "./../../components";
import moment from "moment";
import { DATE_TWELVE_HOUR } from "../../constants/dateFormatConstants";
import cn from "classnames";
import { User } from "../../types/userType";
import { USER_OWNER_NAME_PlACEHOLDER } from "../../constants/profileConstans";

const { Paragraph } = Typography;

type Props = {
    messages: Array<Message>;
    profile: UserProfile;
    user: User;
    userId: number;
    onDeleteMessage: (deleteMessageData: DeleteRestoreMessageData) => void;
    onMarkMessageAsSpam: (messageId: string) => void;
    onRestoreMessage: (restoreMessageData: DeleteRestoreMessageData) => void;
    totalMessagesCount: number;
    isFetchingMessages: boolean;
};
const Messages: React.FC<Props> = ({
    messages,
    profile,
    isFetchingMessages,
    user,
    onDeleteMessage,
    onMarkMessageAsSpam,
    onRestoreMessage,
}): JSX.Element => {
    const messagesRef = useRef(null);

    useEffect(() => {
        messagesRef.current.scrollTo(0, messagesRef?.current?.scrollHeight);
    }, [messages]);

    const handleDeleteClick = (message: Message, owmMessage: boolean) => {
        onDeleteMessage({ messageId: message?.id, byRecipient: owmMessage });
    };
    const handleMarkAsSpam = (message: Message) => {
        onMarkMessageAsSpam(message?.id);
    };
    const handleRestoreMessage = (message: Message, owmMessage: boolean) => {
        onRestoreMessage({ messageId: message?.id, byRecipient: owmMessage });
    };

    const getMenu = (message: Message, owmMessage: boolean) => (
        <Menu>
            {message?.deletedByRecipient || message?.deletedBySender || message?.isSpam ? (
                <Menu.Item icon={<DeleteTwoTone />} onClick={() => handleRestoreMessage(message, owmMessage)} key="2">
                    Restore Message
                </Menu.Item>
            ) : (
                <Menu.Item icon={<DeleteTwoTone />} onClick={() => handleDeleteClick(message, owmMessage)} key="1">
                    Delete Message
                </Menu.Item>
            )}
            {message?.senderId !== user.profile?.userId && !message.isSpam && !message.deletedByRecipient && (
                <Menu.Item icon={<MessageTwoTone />} onClick={() => handleMarkAsSpam(message)} key="3">
                    Mark As Spam
                </Menu.Item>
            )}
        </Menu>
    );
    return (
        <Row
            className="thinScrollBar"
            align="bottom"
            style={{
                height: "52.2vh",
                overflow: "auto",
                marginBottom: "1rem",
                marginTop: "1rem",
                paddingRight: "0.625rem",
                paddingLeft: "0.625rem",
            }}
            ref={messagesRef}
        >
            <Col xs={24} sm={24}>
                {isFetchingMessages ? (
                    <MessangerLoader />
                ) : (
                    messages.map(item => {
                        return (
                            <div
                                className={cn("message-container", {
                                    ["user-messages"]: item?.senderId === user.profile?.userId,
                                })}
                                key={item?.id}
                            >
                                <div className="logo-block">
                                    <img
                                        src={
                                            item?.senderId === user.profile?.userId
                                                ? user?.profile?.photos?.large ?? logo
                                                : profile?.photos?.large ?? logo
                                        }
                                        alt="dialogs-logo"
                                    />
                                </div>

                                <div className="message-block">
                                    <Tooltip title={moment(item.addedAt).format(DATE_TWELVE_HOUR)}>
                                        <span>
                                            {item?.senderId === user.profile?.userId
                                                ? USER_OWNER_NAME_PlACEHOLDER
                                                : profile?.fullName}
                                        </span>
                                        <span>{moment(item.addedAt).fromNow()}</span>
                                    </Tooltip>
                                    <Paragraph
                                        type={
                                            ((item.deletedBySender || item.deletedByRecipient) && "success") ||
                                            (item.isSpam && "warning") ||
                                            null
                                        }
                                    >
                                        <p>
                                            {(item.deletedBySender || (item.deletedByRecipient && !item.isSpam)) && (
                                                <>
                                                    <CheckCircleTwoTone twoToneColor="#52c41a" />
                                                    This message was deleted
                                                </>
                                            )}
                                            {item.isSpam && (
                                                <>
                                                    <CheckCircleTwoTone twoToneColor="#faad14" />
                                                    This message was marked as span
                                                </>
                                            )}
                                            {!item.isSpam &&
                                                !item.deletedBySender &&
                                                !item.deletedByRecipient &&
                                                item?.body}
                                        </p>
                                        <Dropdown
                                            arrow={{
                                                pointAtCenter: true,
                                            }}
                                            placement={
                                                item?.senderId === user.profile?.userId ? "bottomLeft" : "bottomRight"
                                            }
                                            overlay={() => getMenu(item, item?.senderId !== user.profile?.userId)}
                                            trigger={["click"]}
                                        >
                                            <Button type="link">
                                                <MoreOutlined />
                                            </Button>
                                        </Dropdown>
                                    </Paragraph>
                                </div>
                            </div>
                        );
                    })
                )}
            </Col>
        </Row>
    );
};

export default Messages;
