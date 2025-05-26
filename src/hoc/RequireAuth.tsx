import { useAppSelector } from "@hooks";
import { FC, PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LOGIN_PAGE_PATH } from "@constants/pathConstants";

export const RequireAuth: FC<PropsWithChildren> = ({ children }) => {
    const { pathname } = useLocation();
    const { isAuth } = useAppSelector(state => state.authReducer);
    if (!isAuth) {
        return <Navigate to={LOGIN_PAGE_PATH} state={{ pathname }} />;
    }
    return children;
};
