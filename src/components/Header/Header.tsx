import React from "react";
import { Layout, Avatar, Image, Row, Col, Button, Tooltip, Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
import { logo } from "../../assets/img/common";
import { LogOutIcon, LogInIcon } from "../../icons";
import { LOGIN_PAGE_PATH } from "../../constants/pathConstants";
import { Navigation } from "../Navigation";

import { logOut } from "../../store/reducers/AuthSlice";
import { useAppDispatch, useAppSelector } from "@hooks";

const { Header } = Layout;

const navigationColStyle = { width: "calc(100% - 80px)" };
const logInLogOutColStyle = { display: "flex", alignItems: "center" };
const avatarStyle = { width: 32 };

const AppHeader: React.FC = (): JSX.Element => {
    const { isAuth, user, isLoading } = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLoginLogout = (): void => {
        if (isAuth) {
            dispatch(logOut());
        } else {
            navigate(LOGIN_PAGE_PATH);
        }
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
                    <Tooltip title={isAuth ? "log Out" : "log In"}>
                        <Button
                            type="dashed"
                            shape="round"
                            size="large"
                            onClick={handleLoginLogout}
                            icon={isAuth ? <LogOutIcon /> : <LogInIcon />}
                        />
                    </Tooltip>
                </Col>
            </Row>
        </Header>
    );
};

export default AppHeader;
