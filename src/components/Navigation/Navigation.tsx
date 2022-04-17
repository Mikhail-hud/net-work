import React from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
    DIALOGS_PAGE_PATH,
    FRIENDS_PAGE_PATH,
    PROFILE_PAGE_PATH,
    USERS_PAGE_PATH,
} from "../../constants/pathConstants";
import { MessageOutlined, TeamOutlined, UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";

const iconStyle = { fontSize: "17px" };

const navigationLinks = [
    {
        key: PROFILE_PAGE_PATH,
        slug: PROFILE_PAGE_PATH,
        icon: <UserOutlined style={iconStyle} />,
        title: "Profile",
    },
    {
        key: USERS_PAGE_PATH,
        slug: USERS_PAGE_PATH,
        icon: <TeamOutlined style={iconStyle} />,
        title: "Users",
    },
    {
        key: FRIENDS_PAGE_PATH,
        slug: FRIENDS_PAGE_PATH,
        icon: <UsergroupAddOutlined style={iconStyle} />,
        title: "Friends",
    },
    {
        key: DIALOGS_PAGE_PATH,
        slug: DIALOGS_PAGE_PATH,
        icon: <MessageOutlined style={iconStyle} />,
        title: "Dialogs",
    },
];
const Navigation = () => {
    const { pathname } = useLocation();

    const selectedKey =
        (pathname.startsWith(PROFILE_PAGE_PATH) && PROFILE_PAGE_PATH) ||
        (pathname.startsWith(DIALOGS_PAGE_PATH) && DIALOGS_PAGE_PATH) ||
        (pathname.startsWith(FRIENDS_PAGE_PATH) && FRIENDS_PAGE_PATH) ||
        (pathname.startsWith(USERS_PAGE_PATH) && USERS_PAGE_PATH);

    return (
        <Menu theme="light" mode="horizontal" selectedKeys={[selectedKey]}>
            {navigationLinks.map(item => {
                return (
                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.slug}>{item.title}</Link>
                    </Menu.Item>
                );
            })}
        </Menu>
    );
};

export default Navigation;
