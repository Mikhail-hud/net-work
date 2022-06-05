import React, { useEffect, useRef } from "react";
import { logo } from "../../assets/img/common";
import { Row, Col, Tooltip } from "antd";
import { Message } from "../../types/dialogsTypes";
import { UserProfile } from "../../types/profileTypes";
import { MessangerLoader } from "./../../components";

type Props = {
    messages: Array<Message>;
    profile: UserProfile;
    isFetchingMessages: boolean;
};
const Messages: React.FC<Props> = ({ messages, profile, isFetchingMessages }): JSX.Element => {
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
                            <div className="message-container" key={item?.id}>
                                <Tooltip title={profile?.fullName}>
                                    <div className="logo-block">
                                        <img src={profile?.photos?.large ?? logo} alt="dialogs-logo" />
                                    </div>
                                </Tooltip>
                                <div className="message-block">
                                    <p>{item?.body}</p>
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
