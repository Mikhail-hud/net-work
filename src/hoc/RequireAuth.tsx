import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LOGIN_PAGE_PATH } from "../constants/pathConstants";
import { useAppSelector } from "../hooks";

const RequireAuth: React.FC<any> = ({ children }): JSX.Element => {
    const { pathname } = useLocation();
    const { isAuth } = useAppSelector(state => state.authReducer);
    if (!isAuth) {
        return <Navigate to={LOGIN_PAGE_PATH} state={{ pathname }} />;
    }
    return children;
};

export default RequireAuth;
