import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { usersAPI } from "../../api";
import { RESULT_CODE_SUCCESS } from "../../constants/apiResultCodeConstans";
import { Notification } from "../../components";
import { ToggleFollowingProgressPayload, UsersDataEntities, UsersQueryParameters } from "../../types/usersType";
import { UsersState } from "../../types/reducerTypes";

const initialState: UsersState = {
    users: [],
    totalCount: 0,
    isFetching: true,
    followingInProgress: [],
};

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async ({ count, page, friend }: UsersQueryParameters) => {
        try {
            return await usersAPI.getUsers(page, count, friend);
        } catch (e) {
            Notification(e.message);
        }
    }
);

export const follow = createAsyncThunk("users/follow", async (userId: number, { dispatch }) => {
    try {
        dispatch(toggleFollowingProgress({ isFetching: true, userId }));
        const response = await usersAPI.follow(userId);
        if (response.resultCode === RESULT_CODE_SUCCESS) {
            dispatch(toggleFollowingProgress({ isFetching: false, userId }));
            return userId;
        }
    } catch (e) {
        Notification(e.message);
    }
});

export const unFollow = createAsyncThunk("users/unFollow", async (userId: number, { dispatch }) => {
    try {
        dispatch(toggleFollowingProgress({ isFetching: true, userId }));
        const response = await usersAPI.unfollow(userId);
        if (response.resultCode === RESULT_CODE_SUCCESS) {
            dispatch(toggleFollowingProgress({ isFetching: false, userId }));
            return userId;
        }
    } catch (e) {
        Notification(e.message);
    }
});
export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        toggleFollowingProgress: (state: UsersState, action: PayloadAction<ToggleFollowingProgressPayload>) => {
            const { isFetching, userId } = action.payload;
            state.followingInProgress = isFetching
                ? [...state.followingInProgress, userId]
                : state.followingInProgress.filter(id => id !== userId);
        },
    },
    extraReducers: {
        [fetchUsers.pending.type]: state => {
            state.isFetching = true;
        },
        [fetchUsers.fulfilled.type]: (state: UsersState, action: PayloadAction<UsersDataEntities>) => {
            const { items, totalCount } = action.payload;
            state.isFetching = false;
            state.totalCount = totalCount;
            state.users = items;
        },
        [follow.fulfilled.type]: (state: UsersState, action: PayloadAction<number>) => {
            state.users = state.users.map(user => {
                if (user.id === action.payload) {
                    return { ...user, followed: true };
                }
                return user;
            });
        },
        [unFollow.fulfilled.type]: (state: UsersState, action: PayloadAction<number>) => {
            state.users = state.users.map(user => {
                if (user.id === action.payload) {
                    return { ...user, followed: false };
                }
                return user;
            });
        },
    },
});

export const { toggleFollowingProgress } = usersSlice.actions;
export default usersSlice.reducer;
