import React from "react";
import { Layout, Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { PROFILE_PAGE_PATH } from "../constants/pathConstants";

const { Content } = Layout;

const NotFoundPage: React.FC = (): JSX.Element => {
    const navigate = useNavigate();

    const handleClick = (): void => {
        navigate(PROFILE_PAGE_PATH);
    };
    return (
        <Content>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Button onClick={handleClick} type="primary">
                        Back Home
                    </Button>
                }
            />
        </Content>
    );
};

export default NotFoundPage;
