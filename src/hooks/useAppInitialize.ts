import { useEffect } from "react";
import { getAuthUserData } from "../store/actions/AuthAction";
import { useAppDispatch, useAppSelector } from "./redux";

export const useAppInitialize = () => {
    const dispatch = useAppDispatch();
    const { initialized } = useAppSelector(state => state.initializeReducer);
    useEffect(() => {
        dispatch(getAuthUserData());
    }, []);
    return {
        initialized,
    };
};
