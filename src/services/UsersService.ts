import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseURL, headers, credentials } from "../api/api";
import { FRIEND, PAGE, LIMIT } from "../constants/usersConstants";
import { UsersDataEntities, UsersQueryParameters } from "../types/usersType";

export const usersAPI = createApi({
    reducerPath: "usersAPI",
    baseQuery: fetchBaseQuery({ baseUrl: baseURL, headers, credentials }),
    tagTypes: ["Users"],
    endpoints: build => ({
        fetchUsers: build.query<UsersDataEntities, UsersQueryParameters>({
            query: ({ page = PAGE.default, count = LIMIT.default, friend = FRIEND.default }) => ({
                url: `users`,
                params: {
                    page,
                    count,
                    friend,
                },
            }),
            providesTags: ["Users"],
        }),
    }),
});

export const { useFetchUsersQuery } = usersAPI;
