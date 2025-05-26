import { baseURL, credentials, headers } from "@api";
import { FRIEND, PAGE, LIMIT } from "@constants/usersConstants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UsersDataEntities, UsersQueryParameters } from "@app/types/usersType";

export const USERS_TAG = "users";

export const usersService = createApi({
    reducerPath: "usersService",
    baseQuery: fetchBaseQuery({ baseUrl: baseURL, headers, credentials }),
    tagTypes: [USERS_TAG],
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
            providesTags: [USERS_TAG],
        }),
    }),
});

export const { useFetchUsersQuery } = usersService;
