import React, { useEffect, useRef } from "react";
import { logo } from "../../assets/img/common";
import { Row, Col, Tooltip, Typography, Dropdown, Menu, Button } from "antd";
import { DeleteTwoTone, MessageTwoTone, MoreOutlined } from "@ant-design/icons";
import { Message } from "../../types/dialogsTypes";
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
    onDeleteMessage: (messageId: string) => void;
    totalMessagesCount: number;
    isFetchingMessages: boolean;
};
const Messages: React.FC<Props> = ({ messages, profile, isFetchingMessages, user, onDeleteMessage }): JSX.Element => {
    const messagesRef = useRef(null);

    useEffect(() => {
        messagesRef.current.scrollTo(0, messagesRef?.current?.scrollHeight);
    }, [messages]);

    const handleDeleteClick = (message: Message) => {
        onDeleteMessage(message?.id);
    };
    const handleMarkAsSpam = (message: Message) => {
        console.log(message?.id);
    };

    const getMenu = (message: Message) => (
        <Menu>
            <Tooltip title="Only for you!">
                <Menu.Item icon={<DeleteTwoTone />} onClick={() => handleDeleteClick(message)} key="1">
                    Delete Message
                </Menu.Item>
            </Tooltip>
            {message?.senderId !== user.profile?.userId && (
                <Menu.Item icon={<MessageTwoTone />} onClick={() => handleMarkAsSpam(message)} key="2">
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
                                    <Paragraph>
                                        <p>{item?.body}</p>
                                        <Dropdown
                                            arrow={{
                                                pointAtCenter: true,
                                            }}
                                            placement={
                                                item?.senderId === user.profile?.userId ? "bottomLeft" : "bottomRight"
                                            }
                                            overlay={() => getMenu(item)}
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
