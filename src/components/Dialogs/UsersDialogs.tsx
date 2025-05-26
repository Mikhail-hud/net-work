import moment from "moment";
import { Link } from "react-router-dom";
import { logo } from "@assets/img/common";
import { Dialog } from "@app/types/dialogsTypes";
import { ChangeEvent, FC, useState } from "react";
import { CommentOutlined, SearchOutlined } from "@ant-design/icons";
import { List, Avatar, Drawer, Button, Space, Typography, Badge, Input } from "antd";

const { Text } = Typography;

interface UsersDialogsProps {
    dialogs: Array<Dialog>;
    isFetchingDialogs: boolean;
}

export const UsersDialogs: FC<UsersDialogsProps> = ({ dialogs, isFetchingDialogs }) => {
    const [visible, setVisible] = useState(false);
    const [localValue, setLocalValue] = useState<string>("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLocalValue(event.target.value);
    };

    const showDrawer = (): void => {
        setVisible(true);
    };

    const onClose = (): void => {
        setVisible(false);
    };
    return (
        <>
            <Button type="primary" shape="round" icon={<CommentOutlined />} onClick={showDrawer} />
            <Drawer
                className="dialogs-list"
                title="Dialogs"
                placement="left"
                closable
                onClose={onClose}
                width={400}
                visible={visible}
            >
                <Input
                    style={{ marginBottom: "1rem" }}
                    allowClear
                    suffix={<SearchOutlined style={{ fontSize: "1.1em" }} />}
                    onChange={handleChange}
                    placeholder="Searching for dialogs"
                    value={localValue}
                />
                <List
                    loading={isFetchingDialogs}
                    itemLayout="horizontal"
                    dataSource={
                        dialogs?.filter(dialog =>
                            dialog?.userName?.toLowerCase().includes(localValue.trim().toLowerCase())
                        ) ?? []
                    }
                    renderItem={item => (
                        <List.Item onClick={onClose}>
                            <Link to={`/dialogs/${item?.id}`}>
                                <List.Item.Meta
                                    title={item?.userName}
                                    description={
                                        <Space direction="vertical">
                                            <Text strong={item?.hasNewMessages} ellipsis>
                                                Last dialogs activity:
                                                {moment(item?.lastDialogActivityDate).fromNow()}
                                            </Text>
                                        </Space>
                                    }
                                    avatar={
                                        <Badge count={item?.newMessagesCount} title="New Messages">
                                            <Avatar src={item?.photos?.large ?? logo} />
                                        </Badge>
                                    }
                                />
                            </Link>
                        </List.Item>
                    )}
                />
            </Drawer>
        </>
    );
};
