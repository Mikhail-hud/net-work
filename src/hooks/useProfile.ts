import { useEffect, ChangeEvent, useRef } from "react";
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
    addLike,
    updatePost,
    setEditMode,
} from "../store/reducers/ProfileSlice";
import { NewLikeData, NewPostData, UpdatedPostData } from "../types/profileTypes";

export const useProfile = () => {
    const dispatch = useAppDispatch();
    const params = useParams();
    const postsRef = useRef(null);
    const { user } = useAppSelector(state => state.authReducer);
    const userId = params?.userId ?? user?.id;
    const isOwner = !params.userId;
    const {
        profile,
        isProfileFetching,
        isStatusFetching,
        isPhotoSaving,
        status,
        posts,
        isProfileSaving,
        editMode,
        profileDataFormError,
    } = useAppSelector(state => state.profileReducer);

    const isFetching = isProfileFetching || isStatusFetching;

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files.length) {
            dispatch(savePhoto(e.target.files[0]));
        }
    };
    const onStatusUpdate = (status: string): void => {
        dispatch(updateStatus(status));
    };
    const onAddPost = (newPostData: NewPostData): void => {
        dispatch(addPost(newPostData));
    };

    const onLikeAdd = (newLikeData: NewLikeData): void => {
        dispatch(addLike(newLikeData));
    };

    const onPostDelete = (id: number): void => {
        dispatch(deletePost(id));
    };
    const onSetEditMode = (editMode: boolean): void => {
        dispatch(setEditMode(editMode));
    };
    const onPostUpdate = (updatedPostData: UpdatedPostData): void => {
        dispatch(updatePost(updatedPostData));
    };

    useEffect(() => {
        postsRef?.current?.scrollTo(0, 0);
    }, [posts]);

    useEffect(() => {
        if (userId) {
            dispatch(fetchProfile(Number(userId)));
            dispatch(getStatus(Number(userId)));
            dispatch(getPosts(Number(userId)));
        }
    }, [userId]);

    const getUserProfileData = (userId: number): void => {
        dispatch(fetchProfile(Number(userId)));
        dispatch(getStatus(Number(userId)));
        dispatch(getPosts(Number(userId)));
    };

    return {
        editMode,
        onSetEditMode,
        onMainPhotoSelected,
        onLikeAdd,
        onAddPost,
        onPostDelete,
        onStatusUpdate,
        onPostUpdate,
        postsRef,
        user,
        status,
        isOwner,
        profile,
        isFetching,
        isPhotoSaving,
        profileDataFormError,
        isProfileSaving,
        getUserProfileData,
        userId,
        posts,
    };
};
