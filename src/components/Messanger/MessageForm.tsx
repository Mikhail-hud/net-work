import React from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Typography, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { User } from "../../types/userType";
import { NewMessageData } from "../../types/dialogsTypes";

const { Text } = Typography;

const INPUT_NAME = "newMessage";

type Props = {
    onSendMessage: (newMesage: NewMessageData) => void;
    user?: User;
    userId: number;
};
const MessageForm: React.FC<Props> = ({ onSendMessage, userId }): JSX.Element => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const onSubmit = ({ newMessage }) => {
        newMessage.trim() &&
            onSendMessage({
                body: newMessage,
                recipientId: userId,
            });
        reset();
    };
    return (
        <Row>
            <Col xs={24}>
                <form onSubmit={handleSubmit(onSubmit)} className="send-message-form" autoComplete="off">
                    {errors.newMessage?.type === "maxLength" && (
                        <Text type="danger">The character limit for a single message is 160 characters</Text>
                    )}
                    <textarea
                        rows={3}
                        name={INPUT_NAME}
                        {...register(INPUT_NAME, { required: true, maxLength: 160 })}
                    />
                    <Button
                        disabled={errors.newMessage?.type === "maxLength"}
                        htmlType="submit"
                        type="dashed"
                        shape="round"
                        size="large"
                        icon={<SendOutlined />}
                    >
                        Send
                    </Button>
                </form>
            </Col>
        </Row>
    );
};

export default MessageForm;
