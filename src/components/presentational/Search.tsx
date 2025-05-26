import { Input } from "antd";
import { useSearchParams } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { PAGE, SEARCH } from "@constants/usersConstants";
import { UsersQueryParameters } from "@app/types/usersType";
import { ChangeEvent, useState, useEffect, FC } from "react";

interface SearchProps {
    isFriendsFetched: boolean;
    params: UsersQueryParameters;
}

export const Search: FC<SearchProps> = ({ isFriendsFetched, params }) => {
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
