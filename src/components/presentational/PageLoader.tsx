import React from "react";
import { Row, Skeleton, Col } from "antd";

type Props = {
    isHeaderShown?: boolean;
};
const PageLoader: React.FC<Props> = ({ isHeaderShown }): JSX.Element => {
    return (
        <Row justify="center" className="page-loader">
            {isHeaderShown && (
                <Col span={24}>
                    <Row justify="start" className="header-shown">
                        <Col>
                            <Skeleton.Button active />
                        </Col>
                    </Row>
                </Col>
            )}
            <Col span={24}>
                <Skeleton.Avatar active size="large" />
            </Col>
            <Col span={24}>
                <Skeleton active />
            </Col>
            <Col span={24}>
                <Skeleton active />
            </Col>
        </Row>
    );
};

export default PageLoader;
