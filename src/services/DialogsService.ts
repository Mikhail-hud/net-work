import { baseURL, credentials, headers } from "@api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const DIALOGS_TAG = "dialogs";

export const dialogsService = createApi({
    reducerPath: "dialogsService",
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        credentials,
        headers,
        prepareHeaders: headers => {
            return headers;
        },
    }),
    tagTypes: [DIALOGS_TAG],
    endpoints: builder => ({
        getListOfNewMessages: builder.query<number, void>({
            query: () => `dialogs/messages/new/count`,
            providesTags: [DIALOGS_TAG],
        }),
    }),
});

export const { useGetListOfNewMessagesQuery } = dialogsService;
