import { useAppDispatch, useAppSelector } from "./redux";
import { fetchAllDialogs } from "../store/reducers/DialogsSlice";
import { useEffect } from "react";

export const useDialogs = () => {
    const dispatch = useAppDispatch();
    const { dialogs, isFetchingDialogs } = useAppSelector(state => state.dialogsReducer);

    useEffect(() => {
        dispatch(fetchAllDialogs());
    }, []);

    return {
        dialogs,
        isFetchingDialogs,
    };
};
