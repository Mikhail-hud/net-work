import { FC } from "react";
import moment from "moment";
import { useAppSelector } from "@hooks";
import useApp from "antd/es/app/useApp";
import { User } from "@app/types/userType";
import { Row, Col, Button, Input, Form } from "antd";
import { NewPostData } from "@app/types/profileTypes";
import { MAX_POST_LENGTH } from "@constants/profileConstans";
import { InfoCircleOutlined, SendOutlined } from "@ant-design/icons";
import { ACCESS_MESSAGE_AUTORIZATION_DENIED, ACCESS_DESCRIPTION_AUTORIZATION_DENIED } from "@constants/accessConstans";

interface NewPostForm {
    post: string;
}

const { TextArea } = Input;
const INPUT_NAME = "newPost";

interface PostFormProps {
    user: User;
    onAddPost: (newPostData: NewPostData) => void;
}

export const PostForm: FC<PostFormProps> = ({ onAddPost, user }) => {
    const [form] = Form.useForm();
    const { notification } = useApp();
    const { isAuth } = useAppSelector(state => state.authReducer);

    const onSubmit = (values: NewPostForm): void => {
        const { post } = values;
        if (isAuth) {
            onAddPost({
                postText: post.trim(),
                profile: user.profile,
                postDate: moment().format(),
            });
            form.resetFields();
        } else {
            notification.open({
                duration: 3,
                description: ACCESS_MESSAGE_AUTORIZATION_DENIED,
                message: ACCESS_DESCRIPTION_AUTORIZATION_DENIED,
                icon: <InfoCircleOutlined style={{ color: "red" }} />,
            });
        }
    };
    return (
        <Row>
            <Col xs={24}>
                <Form<NewPostForm> form={form} onFinish={onSubmit}>
                    <Form.Item
                        name="post"
                        rules={[
                            { whitespace: true, message: "Post cannot be a blank character" },
                            { required: true, message: "Please enter your message" },
                            {
                                max: MAX_POST_LENGTH,
                                message: `The character limit for a single message is ${MAX_POST_LENGTH} characters`,
                            },
                        ]}
                    >
                        <TextArea
                            rows={3}
                            allowClear
                            name={INPUT_NAME}
                            variant="underlined"
                            style={{ borderRadius: "16px 0px 16px 0px", marginBottom: "10px" }}
                        />
                    </Form.Item>
                    <Button htmlType="submit" type="text" shape="round" size="large" icon={<SendOutlined />}>
                        Post
                    </Button>
                </Form>
            </Col>
        </Row>
    );
};
