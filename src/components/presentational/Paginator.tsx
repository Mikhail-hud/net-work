import React from "react";
import { Pagination, Row, Col } from "antd";
import { useSearchParams } from "react-router-dom";
import { PAGE, LIMIT } from "../../constants/usersConstants";
import { getSearchParams } from "../../helpers/urlHelpers";
import { INITIAL_PARAMS } from "../../constants/usersConstants";

type Props = {
    totalItemsCount: number;
    isFetching: boolean;
};

const Paginator: React.FC<Props> = ({ totalItemsCount, isFetching }): JSX.Element => {
    const [searchParams, setSearchParams] = useSearchParams();
    const params = getSearchParams(searchParams, INITIAL_PARAMS) as Record<string, any>;
    const currentPage = Number(searchParams.get(PAGE.key));
    const pageSize = Number(searchParams.get(LIMIT.key));
    const onChange = (nextPage, nextPageSize) => {
        setSearchParams({ ...params, [PAGE.key]: nextPage, [LIMIT.key]: nextPageSize });
    };

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
                    showTotal={total => `${total} Users`}
                />
            </Col>
        </Row>
    );
};

export default Paginator;
