import { useEffect, useState, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux";
import { fetchProfile, getStatus, savePhoto, updateStatus } from "../store/reducers/ProfileSlice";

export const useProfile = () => {
    const dispatch = useAppDispatch();
    const params = useParams();
    const { user } = useAppSelector(state => state.authReducer);
    const userId = params?.userId ?? user.id;
    const isOwner = !params.userId;
    const [editMode, setEditMode] = useState(false);
    const { profile, isFetching, isPhotoSaving, status } = useAppSelector(state => state.profileReducer);

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files.length) {
            dispatch(savePhoto(e.target.files[0]));
        }
    };
    const onUpdateStatus = (status: string): void => {
        dispatch(updateStatus(status));
    };

    useEffect(() => {
        dispatch(fetchProfile(Number(userId)));
        dispatch(getStatus(Number(userId)));
    }, [userId]);

    return {
        editMode,
        setEditMode,
        onMainPhotoSelected,
        onUpdateStatus,
        status,
        isOwner,
        profile,
        isFetching,
        isPhotoSaving,
        userId,
    };
};
