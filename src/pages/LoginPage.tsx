import React from "react";
import { Form, Input, Button, Checkbox, Row, Col, Typography, Layout } from "antd";
import { UserOutlined, LockOutlined, SortDescendingOutlined } from "@ant-design/icons";
import { logIn } from "../store/reducers/AuthSlice";

import { UserCredential } from "../types/userType";
import { useLocation, useNavigate } from "react-router-dom";
import { PUBLIC_PATH } from "../constants/pathConstants";
import { useAppDispatch, useAppSelector } from "@hooks";

const { Content } = Layout;
const { Text } = Typography;

const formStyle = { margin: "0 auto", maxWidth: "500px", marginTop: "50px" };
const captchaImgStyle = { margin: "0 auto", display: "block", marginBottom: "10px" };
const helpersStyle = { marginBottom: "10px" };
const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
};
const tailLayout = {
    wrapperCol: { offset: 5, span: 19 },
};

interface LocationState {
    pathname: string;
}

export const LoginPage: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoading, captchaUrl, error, isAuth } = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();
    const onFinish = (values: UserCredential) => {
        dispatch(logIn(values));
    };

    if (isAuth) {
        const state = location.state as LocationState;
        navigate(state?.pathname ?? PUBLIC_PATH, { replace: true });
    }

    return (
        <Content>
            <h1>Sign In</h1>
            <Row justify="center">
                <Col span={24}>
                    <Form
                        style={formStyle}
                        {...layout}
                        name="login"
                        initialValues={{ rememberMe: true }}
                        onFinish={onFinish}
                    >
                        {captchaUrl && (
                            <>
                                <Row>
                                    <Col xs={24} sm={{ span: 19, offset: 5 }}>
                                        <img src={captchaUrl} alt="captcha" style={captchaImgStyle} />
                                    </Col>
                                </Row>
                                <Form.Item
                                    label="Captcha"
                                    name="captcha"
                                    rules={[{ required: true, message: "Please input your Captcha!" }]}
                                >
                                    <Input type="text" prefix={<SortDescendingOutlined />} />
                                </Form.Item>
                            </>
                        )}
                        <Row>
                            <Col xs={24} sm={{ span: 19, offset: 5 }} style={helpersStyle}>
                                <Text strong>For test use email: free@samuraijs.com</Text>
                            </Col>
                        </Row>
                        <Form.Item
                            label="Email"
                            name="email"
                            validateStatus={error && "error"}
                            help={error}
                            rules={[{ required: true, message: "Please input your email!" }]}
                        >
                            <Input
                                autoComplete="username"
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                type="email"
                            />
                        </Form.Item>
                        <Row>
                            <Col xs={24} sm={{ span: 19, offset: 5 }} style={helpersStyle}>
                                <Text strong>Password: free</Text>
                            </Col>
                        </Row>
                        <Form.Item
                            label="Password"
                            name="password"
                            validateStatus={error && "error"}
                            help={error}
                            rules={[{ required: true, message: "Please input your password!" }]}
                        >
                            <Input.Password
                                autoComplete="new-password"
                                prefix={<LockOutlined className="site-form-item-icon" />}
                            />
                        </Form.Item>
                        <Form.Item {...tailLayout} name="rememberMe" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button loading={isLoading} disabled={isLoading} type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Content>
    );
};
