import { Spin } from "antd";
import { FC } from "react";

export const Preloader: FC = () => {
    return (
        <Spin style={{ position: "absolute", left: "calc(50% - 30px)", top: "10%" }} size="large" tip="Loading..." />
    );
};
