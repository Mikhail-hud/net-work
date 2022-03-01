import React from "react";
import Icon from "@ant-design/icons";
import logo from "../assets/img/common/logo.png";

export const LogoImg = () => <img src={logo} alt="logoIcon" />;
export const LogoIcon = () => <Icon component={LogoImg} />;
