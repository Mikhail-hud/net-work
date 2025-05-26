import { FC } from "react";
import { logo } from "@assets/img/common";
import { useNavigate } from "react-router-dom";
import { logOut } from "@app/store/reducers/AuthSlice";
import { useAppDispatch, useAppSelector } from "@hooks";
import { LOGIN_PAGE_PATH } from "@constants/pathConstants";
import { Navigation, ThemeToggleSegment } from "@components";
import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { Layout, Avatar, Image, Row, Col, Button, Tooltip, Skeleton, Flex } from "antd";

const { Header } = Layout;

const navigationColStyle = { width: "calc(100% - 80px)" };
const logInLogOutColStyle = { display: "flex", alignItems: "center", justifyContent: "center" };
const avatarStyle = { width: 32 };

export const AppHeader: FC = () => {
    const { isAuth, user, isLoading } = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLoginLogout = (): void => {
        isAuth ? dispatch(logOut()) : navigate(LOGIN_PAGE_PATH);
    };

    return (
        <Header>
            <Row wrap={false} justify="space-between" gutter={10}>
                <Col>
                    {isLoading ? (
                        <Skeleton.Avatar active={isLoading} size="default" shape="circle" />
                    ) : (
                        <Avatar src={<Image src={user?.profile?.photos?.large ?? logo} style={avatarStyle} />} />
                    )}
                </Col>
                <Col style={navigationColStyle}>
                    <Navigation />
                </Col>
                <Col style={logInLogOutColStyle}>
                    <Flex align="center" justify="center" gap={10}>
                        <ThemeToggleSegment />
                        <Tooltip title={isAuth ? "log Out" : "log In"}>
                            <Button
                                type="text"
                                shape="round"
                                size="large"
                                onClick={handleLoginLogout}
                                icon={
                                    isAuth ? (
                                        <LogoutOutlined style={{ color: "var(--colorPrimary)" }} />
                                    ) : (
                                        <LoginOutlined style={{ color: "var(--colorPrimary)" }} />
                                    )
                                }
                            />
                        </Tooltip>
                    </Flex>
                </Col>
            </Row>
        </Header>
    );
};
