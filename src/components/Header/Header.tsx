import { FC } from "react";
import { Navigation } from "@components";
import { logo } from "@assets/img/common";
import { useNavigate } from "react-router-dom";
import { logOut } from "@app/store/reducers/AuthSlice";
import { useAppDispatch, useAppSelector } from "@hooks";
import { Layout, Avatar, Row, Col, Button, Tooltip } from "antd";
import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { LOGIN_PAGE_PATH, PROFILE_PAGE_PATH } from "@constants/pathConstants";

const { Header } = Layout;

const navigationColStyle = { width: "calc(100% - 80px)" };
const logInLogOutColStyle = { display: "flex", alignItems: "center", justifyContent: "center" };
const avatarStyle = { width: 32, cursor: "pointer" };

export const AppHeader: FC = () => {
    const { isAuth, user } = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLoginLogout = (): void => {
        isAuth ? dispatch(logOut()) : navigate(LOGIN_PAGE_PATH);
    };
    const handleAvatarClick = (): void => {
        if (isAuth) {
            navigate(`${PROFILE_PAGE_PATH}/${user?.id}`);
        } else {
            navigate(LOGIN_PAGE_PATH);
        }
    };

    return (
        <Header>
            <Row wrap={false} justify="space-between" gutter={10}>
                <Col>
                    <Avatar
                        onClick={handleAvatarClick}
                        src={user?.profile?.photos?.large ?? logo}
                        style={avatarStyle}
                    />
                </Col>
                <Col style={navigationColStyle}>
                    <Navigation />
                </Col>
                <Col style={logInLogOutColStyle}>
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
                </Col>
            </Row>
        </Header>
    );
};
