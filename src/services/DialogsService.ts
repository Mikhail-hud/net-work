import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseURL, credentials, headers } from "../api";

export const dislogsAPI = createApi({
    reducerPath: "dialogsAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        credentials,
        headers,
    }),
    tagTypes: ["Dialogs"],
    endpoints: build => ({
        fetchListOfNewMessages: build.query<number, void>({
            query: () => ({
                url: `dialogs/messages/new/count`,
            }),
            providesTags: result => ["Dialogs"],
        }),
    }),
});

export const { useFetchListOfNewMessagesQuery } = dislogsAPI;
