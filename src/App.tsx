import { FC } from "react";
import { RequireAuth } from "@hoc";
import { AppLayout } from "@components";
import {
    PUBLIC_PATH,
    PROFILE_PAGE_PATH,
    USERS_PROFILE_PAGE_PATH,
    DIALOGS_PAGE_PATH,
    USERS_PAGE_PATH,
    FRIENDS_PAGE_PATH,
    LOGIN_PAGE_PATH,
    NOT_FOUND_PAGE_PATH,
    MESSANGER_PAGE_PATH,
} from "@constants/pathConstants";
import { Routes, Route, Navigate } from "react-router-dom";
import { DialogsPage, FriendsPage, LoginPage, MessangerPage, NotFoundPage, ProfilePage, UsersPage } from "@pages";

export const App: FC = () => {
    return (
        <Routes>
            <Route path={PUBLIC_PATH} element={<AppLayout />}>
                <Route index element={<Navigate to={PROFILE_PAGE_PATH} />} />
                <Route
                    path={PROFILE_PAGE_PATH}
                    element={
                        <RequireAuth>
                            <ProfilePage />
                        </RequireAuth>
                    }
                />
                <Route path={USERS_PROFILE_PAGE_PATH} element={<ProfilePage />} />
                <Route
                    path={DIALOGS_PAGE_PATH}
                    element={
                        <RequireAuth>
                            <DialogsPage />
                        </RequireAuth>
                    }
                />
                <Route
                    path={MESSANGER_PAGE_PATH}
                    element={
                        <RequireAuth>
                            <MessangerPage />
                        </RequireAuth>
                    }
                />
                <Route path={USERS_PAGE_PATH} element={<UsersPage />} />
                <Route
                    path={FRIENDS_PAGE_PATH}
                    element={
                        <RequireAuth>
                            <FriendsPage />
                        </RequireAuth>
                    }
                />
                <Route path={LOGIN_PAGE_PATH} element={<LoginPage />} />
                <Route path={NOT_FOUND_PAGE_PATH} element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};
