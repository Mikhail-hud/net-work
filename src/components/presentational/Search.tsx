import React, { ChangeEvent, useState, useEffect } from "react";
import { Input } from "antd";
import { useSearchParams } from "react-router-dom";
import { PAGE, SEARCH } from "../../constants/usersConstants";
import { SearchOutlined } from "@ant-design/icons";
import { UsersQueryParameters } from "../../types/usersType";

type Props = {
    isFriendsFetched: boolean;
    params: UsersQueryParameters;
};

const Search: React.FC<Props> = ({ isFriendsFetched, params }): JSX.Element => {
    const { term } = params;
    const [searchParams, setSearchParams] = useSearchParams();
    const [localValue, setLocalValue] = useState(term);

    const handleSearch = (value: string): void => {
        if (value) {
            setSearchParams({
                ...params,
                [PAGE.key]: PAGE.default,
                [SEARCH.key]: value,
            } as Record<keyof UsersQueryParameters, any>);
        } else {
            searchParams.delete(SEARCH.key);
            searchParams.set(PAGE.key, PAGE.default);
            setSearchParams(searchParams);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLocalValue(event.target.value);
        handleSearch(event.target.value);
    };

    useEffect(() => setLocalValue(term), [term]);

    const showTotalPrefix = isFriendsFetched ? "friends" : "users";

    return (
        <Input
            allowClear
            suffix={<SearchOutlined style={{ fontSize: "1.1em" }} />}
            onChange={handleChange}
            placeholder={`Searching for ${showTotalPrefix}`}
            value={localValue}
        />
    );
};

export default Search;
