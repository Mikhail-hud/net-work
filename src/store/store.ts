import { dialogsService, usersService } from "@services";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { profileReducer, usersReducer, initializeReducer, authReducer, dialogsReducer } from "@app/store/reducers";

export const reducers = combineReducers({
    authReducer,
    usersReducer,
    profileReducer,
    dialogsReducer,
    initializeReducer,
    [usersService.reducerPath]: usersService.reducer,
    [dialogsService.reducerPath]: dialogsService.reducer,
});

export const store = configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(usersService.middleware, dialogsService.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
