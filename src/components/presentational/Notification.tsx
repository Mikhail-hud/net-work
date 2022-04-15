import { notification } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const Notification = (error: string, description?: string) => {
    notification.open({
        duration: 3,
        description: description,
        message: error,
        icon: <InfoCircleOutlined style={{ color: "red" }} />,
    });
};

export default Notification;
