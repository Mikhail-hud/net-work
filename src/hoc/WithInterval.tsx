import React from "react";
import { useAppDispatch } from "../hooks";
import { fetchListOfNewMessages } from "../store/reducers/DialogsSlice";

export const INTERVAL_DATA_FETCH_DELAY = 15000;

const WithInterval: React.FC<any> = ({ children }): JSX.Element => {
    const dispatch = useAppDispatch();
    setInterval(function () {
        dispatch(fetchListOfNewMessages());
    }, INTERVAL_DATA_FETCH_DELAY);
    return children;
};

export default WithInterval;
