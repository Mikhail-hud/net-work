import React from "react";
import Icon from "@ant-design/icons";
import logOut from "../assets/img/common/logout.png";

const imgStyle = { width: "28px" };
export const LogOutImg = () => <img style={imgStyle} src={logOut} alt="logOutIcon" />;
export const LogOutIcon = () => <Icon component={LogOutImg} />;
