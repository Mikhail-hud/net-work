import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { profileReducer, usersReducer, initializeReducer, authReducer, dialogsReducer } from "./reducers";
import { usersAPI, dislogsAPI } from "../services";

const rootReducer = combineReducers({
    authReducer,
    initializeReducer,
    usersReducer,
    profileReducer,
    dialogsReducer,
    [usersAPI.reducerPath]: usersAPI.reducer,
    [dislogsAPI.reducerPath]: dislogsAPI.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat([usersAPI.middleware, dislogsAPI.middleware]),
    });
};
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
