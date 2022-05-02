import React, { ChangeEvent, useCallback, useState, useEffect } from "react";
import { Input } from "antd";
import debounce from "lodash.debounce";
import { useSearchParams } from "react-router-dom";
import { PAGE, SEARCH } from "../../constants/usersConstants";
import { SearchOutlined } from "@ant-design/icons";
import { getSearchParams } from "../../helpers/urlHelpers";
import { UsersQueryParameters } from "../../types/usersType";

const ASYNC_INPUT_DEBOUNCE_TIME = 400;

type Props = {
    fetchFriends: boolean;
};

const Search: React.FC<Props> = ({ fetchFriends }): JSX.Element => {
    const [searchParams, setSearchParams] = useSearchParams();
    const params = getSearchParams(searchParams);
    const searchValue = searchParams.get(SEARCH.key);
    const [localValue, setLocalValue] = useState(searchValue);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLocalValue(event.target.value);
        handleChangeDebounced(event.target.value);
    };

    const handleSearch = (value: string): void => {
        if (value) {
            setSearchParams({
                ...params,
                [PAGE.key]: PAGE.default,
                [SEARCH.key]: value,
            } as Record<keyof UsersQueryParameters, any>);
        } else {
            searchParams.delete(SEARCH.key);
            setSearchParams(searchParams);
        }
    };
    useEffect(() => {
        setLocalValue(searchValue);
    }, [searchValue]);

    const handleChangeDebounced = useCallback(
        debounce(value => handleSearch(value), ASYNC_INPUT_DEBOUNCE_TIME),
        []
    );
    const showTotalPrefix = fetchFriends ? "friends" : "users";

    return (
        <Input
            allowClear
            suffix={<SearchOutlined style={{ fontSize: "1.1em" }} />}
            onChange={handleChange}
            placeholder={`Searching for ${showTotalPrefix}`}
            onReset={() => handleChangeDebounced(" ")}
            value={localValue}
        />
    );
};

export default Search;
