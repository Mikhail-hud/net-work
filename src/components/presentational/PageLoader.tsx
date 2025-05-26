import { FC } from "react";
import { Row, Skeleton, Col } from "antd";

type Props = {
    isHeaderShown?: boolean;
};
export const PageLoader: FC<Props> = ({ isHeaderShown }) => {
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
