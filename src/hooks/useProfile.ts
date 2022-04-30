import { useEffect, useState, ChangeEvent, useRef } from "react";
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
} from "../store/reducers/ProfileSlice";
import { NewLikeData, NewPostData, UpdatedPostData } from "../types/profileTypes";

export const useProfile = () => {
    const dispatch = useAppDispatch();
    const params = useParams();
    const postsRef = useRef(null);
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
    const onPostUpdate = (updatedPostData: UpdatedPostData) => {
        dispatch(updatePost(updatedPostData));
    };

    useEffect(() => {
        postsRef?.current?.scrollTo(0, 0);
    }, [posts]);

    useEffect(() => {
        dispatch(fetchProfile(Number(userId)));
        dispatch(getStatus(Number(userId)));
        dispatch(getPosts(Number(userId)));
    }, [userId]);

    return {
        editMode,
        setEditMode,
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
        userId,
        posts,
    };
};
