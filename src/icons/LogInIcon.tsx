import React from "react";
import Icon from "@ant-design/icons";
import { logIn } from "../assets/img/common";

const imgStyle = { width: "28px" };
export const LogInImg = () => <img style={imgStyle} src={logIn} alt="logInIcon" />;
export const LogInIcon = () => <Icon component={LogInImg} />;
