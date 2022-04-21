import { useEffect, useState, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux";
import {
    getStatus,
    savePhoto,
    updateStatus,
    addPost,
    deletePost,
    getPosts,
    fetchProfile,
} from "../store/reducers/ProfileSlice";
import { NewPostData } from "../types/profileTypes";

export const useProfile = () => {
    const dispatch = useAppDispatch();
    const params = useParams();
    const { user } = useAppSelector(state => state.authReducer);
    const userId = params?.userId ?? user.id;
    const isOwner = !params.userId;
    const [editMode, setEditMode] = useState(false);
    const { profile, isFetching, isPhotoSaving, status, posts } = useAppSelector(state => state.profileReducer);

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files.length) {
            dispatch(savePhoto(e.target.files[0]));
        }
    };
    const onUpdateStatus = (status: string): void => {
        dispatch(updateStatus(status));
    };
    const onAddPost = (newPostData: NewPostData): void => {
        dispatch(addPost(newPostData));
    };

    const onAddLike = (id: number): void => {
        console.log(id);
    };

    const onAddDislike = (id: number): void => {
        console.log(id);
    };

    const onDeletePost = (id: number): void => {
        dispatch(deletePost(id));
    };

    useEffect(() => {
        dispatch(fetchProfile(Number(userId)));
        dispatch(getStatus(Number(userId)));
        dispatch(getPosts(Number(userId)));
    }, [userId]);

    return {
        editMode,
        setEditMode,
        onMainPhotoSelected,
        onAddDislike,
        onAddLike,
        onAddPost,
        onDeletePost,
        onUpdateStatus,
        user,
        status,
        isOwner,
        profile,
        isFetching,
        isPhotoSaving,
        userId,
        posts,
    };
};
