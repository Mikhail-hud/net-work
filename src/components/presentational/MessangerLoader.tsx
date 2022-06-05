import React from "react";
import { Skeleton } from "antd";

const MessangerLoader: React.FC = (): JSX.Element => {
    return (
        <>
            <Skeleton
                active
                avatar
                paragraph={{
                    rows: 2,
                }}
            />
            <Skeleton
                active
                avatar
                paragraph={{
                    rows: 2,
                }}
            />
            <Skeleton
                active
                avatar
                paragraph={{
                    rows: 2,
                }}
            />
            <Skeleton
                active
                avatar
                paragraph={{
                    rows: 2,
                }}
            />
        </>
    );
};

export default MessangerLoader;
