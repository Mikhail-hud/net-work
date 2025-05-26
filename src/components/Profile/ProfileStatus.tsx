import { Col } from "antd";
import { Typography } from "antd";
import { useAppSelector } from "@hooks";
import { FC, useEffect, useState } from "react";
import { MAX_STATUS_LENGTH } from "@constants/profileConstans";

interface ProfileStatusProps {
    status: string;
    isOwner: boolean;
    onStatusUpdate: (status: string) => void;
}

export const ProfileStatus: FC<ProfileStatusProps> = ({ status, isOwner, onStatusUpdate }) => {
    const { isAuth } = useAppSelector(state => state.authReducer);
    const [localStatus, setLocalStatus] = useState(status);

    useEffect((): void => {
        setLocalStatus(status);
    }, [status]);

    const onStatusChange = (newStatusText: string): void => {
        setLocalStatus(newStatusText);
        onStatusUpdate(newStatusText);
    };
    if (!status) return null;

    return (
        <Col span={24}>
            {isOwner && isAuth ? (
                <Typography.Paragraph
                    style={{ paddingLeft: "10px", marginBottom: "0" }}
                    editable={{ onChange: onStatusChange, maxLength: MAX_STATUS_LENGTH }}
                >
                    {localStatus}
                </Typography.Paragraph>
            ) : (
                <Typography.Paragraph style={{ marginBottom: "0" }}>{localStatus}</Typography.Paragraph>
            )}
        </Col>
    );
};
