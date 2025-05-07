import { Spin } from "antd";

const Preloader = () => {
    return (
        <Spin style={{ position: "absolute", left: "calc(50% - 30px)", top: "10%" }} size="large" tip="Loading..." />
    );
};

export default Preloader;
