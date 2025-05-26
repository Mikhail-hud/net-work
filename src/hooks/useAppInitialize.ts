import { useEffect } from "react";
import { getAuthUserData } from "@app/store/actions";
import { useAppDispatch, useAppSelector } from "@app/hooks/redux";

interface UseAppInitialize {
    initialized: boolean;
}

export const useAppInitialize = (): UseAppInitialize => {
    const dispatch = useAppDispatch();
    const { initialized } = useAppSelector(state => state.initializeReducer);
    useEffect((): void => {
        dispatch(getAuthUserData());
    }, []);
    return {
        initialized,
    };
};
