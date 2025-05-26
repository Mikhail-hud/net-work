import { Skeleton } from "antd";
import React, { JSX } from "react";

export const MessangerLoader: React.FC = (): JSX.Element => {
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
