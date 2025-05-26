import { useEffect } from "react";
import { Dialog } from "@app/types/dialogsTypes";
import { useAppDispatch, useAppSelector } from "@app/hooks/redux";
import { fetchAllDialogs } from "@app/store/reducers/DialogsSlice";

interface UseDialogs {
    dialogs: Dialog[];
    isFetchingDialogs: boolean;
}

export const useDialogs = (): UseDialogs => {
    const dispatch = useAppDispatch();
    const { dialogs, isFetchingDialogs } = useAppSelector(state => state.dialogsReducer);

    useEffect((): void => {
        dispatch(fetchAllDialogs());
    }, []);

    return {
        dialogs,
        isFetchingDialogs,
    };
};
