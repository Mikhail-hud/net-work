import React from "react";
import Icon from "@ant-design/icons";
import { logo } from "../assets/img/common";

export const LogoImg = () => <img src={logo} alt="logoIcon" />;
export const LogoIcon = () => <Icon component={LogoImg} />;
