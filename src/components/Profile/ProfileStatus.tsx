import React, { ChangeEvent, useEffect, useState } from "react";
import cn from "classnames";

type Props = {
    status: string;
    isOwner: boolean;
    onUpdateStatus: (status: string) => void;
};
const ProfileStatus: React.FC<Props> = ({ status, isOwner, onUpdateStatus }): JSX.Element => {
    const [localStatus, setLocalStatus] = useState(status);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        setLocalStatus(status);
    }, [status]);

    const activateEditMode = (): void => {
        if (isOwner) {
            setEditMode(true);
        }
    };
    const deactivateEditMode = (): void => {
        onUpdateStatus(localStatus);
        setEditMode(false);
    };
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setLocalStatus(e.target.value);
    };

    return (
        <div className={cn("status", { ["status_active"]: isOwner })}>
            {editMode ? (
                <div>
                    <input
                        type="text"
                        onChange={onStatusChange}
                        autoFocus={true}
                        defaultValue={localStatus}
                        onBlur={deactivateEditMode}
                    />
                </div>
            ) : (
                <div>
                    <span onDoubleClick={activateEditMode}>{localStatus || "Dubl click to change your status!!!"}</span>
                </div>
            )}
        </div>
    );
};

export default ProfileStatus;
