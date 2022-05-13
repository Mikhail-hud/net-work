import React from "react";
import { Pagination, Row, Col } from "antd";
import { useSearchParams } from "react-router-dom";
import { PAGE, LIMIT } from "../../constants/usersConstants";
import { UsersQueryParameters } from "../../types/usersType";

type Props = {
    totalItemsCount: number;
    isFetching: boolean;
    isFriendsFetched: boolean;
    params: UsersQueryParameters;
};

const Paginator: React.FC<Props> = ({ totalItemsCount, isFetching, isFriendsFetched, params }): JSX.Element => {
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
                    pageSizeOptions={[5, 10, 15]}
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

export default Paginator;
