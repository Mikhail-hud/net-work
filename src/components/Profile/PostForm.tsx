import React from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Typography, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { Notification } from "../../components";
import { useAppSelector } from "../../hooks";
import {
    ACCESS_MESSAGE_AUTORIZATION_DENIED,
    ACCESS_DESCRIPTION_AUTORIZATION_DENIED,
} from "../../constants/accessConstans";
import { User } from "../../types/userType";
import moment from "moment";
import { NewPostData } from "../../types/profileTypes";

const { Text } = Typography;
const INPUT_NAME = "newPost";

type Props = {
    user: User;
    onAddPost: (newPostData: NewPostData) => void;
};

const PostForm: React.FC<Props> = ({ onAddPost, user }): JSX.Element => {
    const { isAuth } = useAppSelector(state => state.authReducer);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = ({ newPost }) => {
        if (isAuth) {
            onAddPost({
                postText: newPost.trim(),
                profile: user.profile,
                postDate: moment().format(),
            });
            reset();
        } else {
            Notification(ACCESS_MESSAGE_AUTORIZATION_DENIED, ACCESS_DESCRIPTION_AUTORIZATION_DENIED);
        }
    };
    return (
        <Row>
            <Col xs={24}>
                <form onSubmit={handleSubmit(onSubmit)} className="send-message-form" autoComplete="off">
                    {errors.newPost?.type === "maxLength" && (
                        <Text type="danger">The character limit for a single message is 100 characters</Text>
                    )}
                    <textarea
                        rows={2}
                        name={INPUT_NAME}
                        {...register(INPUT_NAME, { required: true, maxLength: 100 })}
                    />
                    <Button
                        disabled={errors?.newPost?.type === "maxLength"}
                        htmlType="submit"
                        type="dashed"
                        shape="round"
                        size="large"
                        icon={<SendOutlined />}
                    >
                        Post
                    </Button>
                </form>
            </Col>
        </Row>
    );
};

export default PostForm;
