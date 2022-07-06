import React, { useEffect, useRef } from "react";
import { logo } from "../../assets/img/common";
import { Row, Col, Tooltip, Typography } from "antd";
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
    isFetchingMessages: boolean;
};
const Messages: React.FC<Props> = ({ messages, profile, isFetchingMessages, user }): JSX.Element => {
    const messagesRef = useRef(null);

    useEffect(() => {
        messagesRef.current.scrollTo(0, messagesRef?.current?.scrollHeight);
    }, [messages]);

    return (
        <Row
            className="thinScrollBar"
            align="bottom"
            style={{ height: "53vh", overflow: "auto", marginBottom: "1rem", marginTop: "1rem" }}
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
                                <Tooltip
                                    title={
                                        item?.senderId === user.profile?.userId
                                            ? USER_OWNER_NAME_PlACEHOLDER
                                            : profile?.fullName
                                    }
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
                                </Tooltip>
                                <div className="message-block">
                                    <Tooltip title={moment(item.addedAt).format(DATE_TWELVE_HOUR)}>
                                        <span>{moment(item.addedAt).fromNow()}</span>
                                    </Tooltip>
                                    <Paragraph>{item?.body}</Paragraph>
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
