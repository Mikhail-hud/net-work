import React, { useEffect, useState } from "react";
import { MAX_STATUS_LENGTH } from "../../constants/profileConstans";
import { Col } from "antd";
import { Typography } from "antd";
import { useAppSelector } from "../../hooks";

const { Paragraph } = Typography;
type Props = {
    status: string;
    isOwner: boolean;
    onStatusUpdate: (status: string) => void;
};
const ProfileStatus: React.FC<Props> = ({ status, isOwner, onStatusUpdate }): JSX.Element => {
    const { isAuth } = useAppSelector(state => state.authReducer);
    const [localStatus, setLocalStatus] = useState(status);

    useEffect(() => {
        setLocalStatus(status);
    }, [status]);

    const onStatusChange = (newStatusText: string): void => {
        setLocalStatus(newStatusText);
        onStatusUpdate(newStatusText);
    };

    return (
        status && (
            <Col span={24}>
                <div className="status">
                    {isOwner && isAuth ? (
                        <Paragraph
                            style={{ paddingLeft: "10px" }}
                            editable={{ onChange: onStatusChange, maxLength: MAX_STATUS_LENGTH }}
                        >
                            {localStatus}
                        </Paragraph>
                    ) : (
                        <div>
                            <p>{localStatus}</p>
                        </div>
                    )}
                </div>
            </Col>
        )
    );
};

export default ProfileStatus;
