import React from "react";
import { Pagination, Row, Col } from "antd";
import { useSearchParams } from "react-router-dom";
import { PAGE, LIMIT } from "../../constants/usersConstants";
import { getSearchParams } from "../../helpers/urlHelpers";
import { UsersQueryParameters } from "../../types/usersType";

type Props = {
    totalItemsCount: number;
    isFetching: boolean;
    fetchFriends: boolean;
};

const Paginator: React.FC<Props> = ({ totalItemsCount, isFetching, fetchFriends }): JSX.Element => {
    const [searchParams, setSearchParams] = useSearchParams();
    const params = getSearchParams(searchParams);
    const currentPage = Number(searchParams.get(PAGE.key));
    const pageSize = Number(searchParams.get(LIMIT.key));
    const onChange = (nextPage, nextPageSize) => {
        setSearchParams({
            ...params,
            [PAGE.key]: nextPage,
            [LIMIT.key]: nextPageSize,
        } as Record<keyof UsersQueryParameters, any>);
    };
    const showTotalPrefix = fetchFriends ? "Friends" : "Users";

    return (
        <Row justify="center">
            <Col>
                <Pagination
                    responsive
                    disabled={isFetching}
                    style={{ textAlign: "center", marginBottom: "2rem" }}
                    pageSizeOptions={[5, 10, 15, 20, 50]}
                    pageSize={pageSize}
                    current={currentPage}
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
