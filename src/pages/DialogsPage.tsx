import React, { ChangeEvent, useState } from "react";
import { Layout, List, Row, Col, Avatar, Badge, Skeleton, Space, Typography, Input } from "antd";
import { useDialogs } from "../hooks";
import { logo } from "../assets/img/common";
import { Link } from "react-router-dom";
import moment from "moment";
import { DATE_TWELVE_HOUR } from "../constants/dateFormatConstants";
import { SearchOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Text } = Typography;

const DialogsPage: React.FC = (): JSX.Element => {
    const { dialogs, isFetchingDialogs } = useDialogs();
    const [localValue, setLocalValue] = useState<string>("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLocalValue(event.target.value);
    };
    return (
        <Content>
            <Row justify="space-between" style={{ marginBottom: "1rem" }}>
                <Col>
                    <h1>Dialogs</h1>
                </Col>
                <Col>
                    <Input
                        allowClear
                        suffix={<SearchOutlined style={{ fontSize: "1.1em" }} />}
                        onChange={handleChange}
                        placeholder="Searching for dialogs"
                        value={localValue}
                    />
                </Col>
            </Row>
            <Row justify="center">
                <Col xs={24} sm={24} md={18} lg={14} xl={12} xxl={10}>
                    <List
                        className="dialogs-list"
                        pagination={{
                            pageSize: 10,
                            hideOnSinglePage: true,
                        }}
                        loading={isFetchingDialogs}
                        itemLayout="horizontal"
                        dataSource={
                            dialogs?.filter(dialog =>
                                dialog?.userName?.toLowerCase().includes(localValue.trim().toLowerCase())
                            ) ?? []
                        }
                        renderItem={item => (
                            <Skeleton loading={isFetchingDialogs} active>
                                <Link to={`/dialogs/` + item?.id}>
                                    <List.Item>
                                        <List.Item.Meta
                                            title={item?.userName}
                                            description={
                                                <Space direction="vertical">
                                                    <Text type={item?.hasNewMessages ? "success" : "secondary"}>
                                                        Was online:
                                                        {moment(item?.lastUserActivityDate).format(DATE_TWELVE_HOUR)}
                                                    </Text>
                                                    <Text type={item?.hasNewMessages ? "success" : "secondary"}>
                                                        Last dialogs activity:
                                                        {moment(item?.lastDialogActivityDate).fromNow()}
                                                    </Text>
                                                </Space>
                                            }
                                            avatar={
                                                <Badge count={item?.newMessagesCount} title="New Messages">
                                                    <Avatar
                                                        size={{
                                                            xs: 40,
                                                            sm: 60,
                                                            md: 80,
                                                            lg: 100,
                                                            xl: 100,
                                                            xxl: 100,
                                                        }}
                                                        src={
                                                            <img alt="dialogs-logo" src={item?.photos?.large ?? logo} />
                                                        }
                                                    />
                                                </Badge>
                                            }
                                        />
                                    </List.Item>
                                </Link>
                            </Skeleton>
                        )}
                    />
                </Col>
            </Row>
        </Content>
    );
};

export default DialogsPage;
