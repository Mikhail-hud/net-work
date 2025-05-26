import { InfoCircleOutlined } from "@ant-design/icons";
import useApp from "antd/es/app/useApp";

export const Notification = (error: string, description?: string) => {
    const { notification } = useApp();
    notification.open({
        duration: 3,
        description: description,
        message: error,
        icon: <InfoCircleOutlined style={{ color: "red" }} />,
    });
};
