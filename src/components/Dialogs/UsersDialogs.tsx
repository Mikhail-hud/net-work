import React, { useState } from "react";
import { Link } from "react-router-dom";
import { List, Avatar, Drawer, Button } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import { Dialog } from "../../types/dialogsTypes";

type Props = {
    dialogs: Array<Dialog>;
};
const UsersDialogs: React.FC<Props> = ({ dialogs }): JSX.Element => {
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    return (
        <>
            <Button type="primary" shape="round" icon={<CommentOutlined />} onClick={showDrawer} />
            <Drawer
                className="dialog-list"
                title="Dialogs"
                placement="left"
                closable={false}
                onClose={onClose}
                width={300}
                visible={visible}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={dialogs}
                    renderItem={item => (
                        <List.Item onClick={onClose}>
                            <Link to={`/dialogs/${item?.id}`}>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    }
                                    title={item?.profile?.fullName}
                                />
                            </Link>
                        </List.Item>
                    )}
                />
            </Drawer>
        </>
    );
};

export default UsersDialogs;
