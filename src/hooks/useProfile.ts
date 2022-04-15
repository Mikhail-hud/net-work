import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./redux";

import { fetchProfile } from "../store/reducers/ProfileSlice";

export const useProfile = () => {
    const dispatch = useAppDispatch();
    const { userId } = useParams();
    const { profile } = useAppSelector(state => state.profileReducer);
    useEffect(() => {
        dispatch(fetchProfile(Number(userId)));
    }, [userId]);

    return {
        profile,
        userId,
    };
};
