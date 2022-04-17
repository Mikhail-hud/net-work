import React, { ChangeEvent, useState } from "react";
import { Input } from "antd";
import { useSearchParams } from "react-router-dom";
import { SEARCH } from "../../constants/usersConstants";
import { getSearchParams } from "../../helpers/urlHelpers";
import { UsersQueryParameters } from "../../types/usersType";

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
    };

    const handleSearch = (value: string): void => {
        if (value) {
            setSearchParams({
                ...params,
                [SEARCH.key]: value,
            } as Record<keyof UsersQueryParameters, any>);
        } else {
            searchParams.delete(SEARCH.key);
            setSearchParams(searchParams);
        }
    };
    const showTotalPrefix = fetchFriends ? "friends" : "users";

    return (
        <Input.Search
            className="search-field"
            onSearch={handleSearch}
            onChange={handleChange}
            placeholder={`Searching for ${showTotalPrefix}`}
            value={localValue}
        />
    );
};

export default Search;
