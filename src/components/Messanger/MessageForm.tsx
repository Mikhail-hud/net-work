import { FC } from "react";
import { User } from "@app/types/userType";
import { SendOutlined } from "@ant-design/icons";
import { Row, Col, Button, Form, Input } from "antd";
import { NewMessageData } from "@app/types/dialogsTypes";
import { MAX_MESSAGE_LENGTH } from "@constants/profileConstans";

const { TextArea } = Input;

const INPUT_NAME = "newMessage";

interface NewMessageForm {
    newMessage: string;
}

interface MessageFormProps {
    onSendMessage: (newMessage: NewMessageData) => void;
    user?: User;
    userId: number;
}

export const MessageForm: FC<MessageFormProps> = ({ onSendMessage, userId }) => {
    const [form] = Form.useForm();
    const onSubmit = ({ newMessage }: NewMessageForm): void => {
        newMessage.trim() &&
            onSendMessage({
                body: newMessage,
                recipientId: userId,
            });
        form.resetFields();
    };
    return (
        <Row>
            <Col xs={24}>
                <Form<NewMessageForm> form={form} onFinish={onSubmit}>
                    <Form.Item
                        name="newMessage"
                        rules={[
                            { whitespace: true, message: "Message cannot be a blank character" },
                            { required: true, message: "Please enter your message" },
                            {
                                max: MAX_MESSAGE_LENGTH,
                                message: `The character limit for a single message is ${MAX_MESSAGE_LENGTH} characters`,
                            },
                        ]}
                    >
                        <TextArea
                            rows={3}
                            autoFocus
                            allowClear
                            name={INPUT_NAME}
                            variant="underlined"
                            onPressEnter={e => {
                                e.preventDefault();
                                form.submit();
                            }}
                            style={{ borderRadius: "16px 0px 16px 0px", marginBottom: "10px" }}
                        />
                    </Form.Item>
                    <Button htmlType="submit" type="text" shape="round" size="large" icon={<SendOutlined />}>
                        Send
                    </Button>
                </Form>
            </Col>
        </Row>
    );
};
