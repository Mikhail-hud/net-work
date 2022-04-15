import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/AuthSlice";
import initializeReducer from "./reducers/InitializeSlice";
import usersReducer from "./reducers/UsersSlice";
import { usersAPI } from "../services/UsersService";

const rootReducer = combineReducers({
    authReducer,
    initializeReducer,
    usersReducer,
    [usersAPI.reducerPath]: usersAPI.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(usersAPI.middleware),
    });
};
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
