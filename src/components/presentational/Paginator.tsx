import { FC } from "react";
import { Pagination, Row, Col } from "antd";
import { useSearchParams } from "react-router-dom";
import { PAGE, LIMIT } from "@constants/usersConstants";
import { UsersQueryParameters } from "@app/types/usersType";

interface PaginatorProps {
    totalItemsCount: number;
    isFetching: boolean;
    isFriendsFetched: boolean;
    params: UsersQueryParameters;
}

export const Paginator: FC<PaginatorProps> = ({ totalItemsCount, isFetching, isFriendsFetched, params }) => {
    const { count, page } = params;
    const [, setSearchParams] = useSearchParams();
    const onChange = (nextPage: number, nextPageSize: number): void => {
        setSearchParams({
            ...params,
            [PAGE.key]: nextPage,
            [LIMIT.key]: nextPageSize,
        } as Record<keyof UsersQueryParameters, string>);
    };
    const showTotalPrefix = isFriendsFetched ? "Friends" : "Users";

    return (
        <Row justify="center">
            <Col>
                <Pagination
                    responsive
                    disabled={isFetching}
                    style={{ textAlign: "center", marginBottom: "2rem" }}
                    pageSizeOptions={[5, 10, 15, 20, 25, 30]}
                    pageSize={Number(count)}
                    current={Number(page)}
                    total={totalItemsCount}
                    showSizeChanger
                    onChange={onChange}
                    showQuickJumper
                    showTotal={total => `${total} ${showTotalPrefix}`}
                />
            </Col>
        </Row>
    );
};
