import React from "react";
import { Badge, Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import {
    DIALOGS_PAGE_PATH,
    FRIENDS_PAGE_PATH,
    PROFILE_PAGE_PATH,
    USERS_PAGE_PATH,
} from "../../constants/pathConstants";
import { MessageOutlined, TeamOutlined, UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../hooks";
import { useFetchListOfNewMessagesQuery } from "../../services";
import { EMPTY_QUERY_PARAMS } from "../../api";
import { NEW_MESSAGES_COUNT_POLLING_INTERVAL_DELAY } from "../../constants/dialogsConstans";

const iconStyle = { fontSize: "17px" };

const getNavigationLinks = (newMessagesCount: number) => [
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
        title: (
            <Badge offset={[10, 0]} overflowCount={99} count={newMessagesCount} title="New Messages">
                Dialogs
            </Badge>
        ),
    },
];
const Navigation = () => {
    const { pathname } = useLocation();
    const { isAuth } = useAppSelector(state => state.authReducer);
    const { data } = useFetchListOfNewMessagesQuery(EMPTY_QUERY_PARAMS, {
        pollingInterval: NEW_MESSAGES_COUNT_POLLING_INTERVAL_DELAY,
        // skip: !isAuth,
    });
    const navigationLinks = getNavigationLinks(data);
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
                        <NavLink to={item.slug}>{item.title}</NavLink>
                    </Menu.Item>
                );
            })}
        </Menu>
    );
};

export default Navigation;
