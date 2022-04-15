import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { profileAPI } from "../../api";
import { Notification } from "../../components";
import { ProfileState } from "../../types/reducerTypes";
import { UserProfile } from "../../types/profileTypes";

const initialState: ProfileState = {
    posts: [
        {
            id: 1,
            message: "React.Js, - a JavaScript library for building user interfaces",
            likesCount: 1,
            dislikesCount: 10,
        },
        {
            id: 2,
            message: "React makes it painless to create interactive UIs.",
            likesCount: 6,
            dislikesCount: 20,
        },
        {
            id: 3,
            message:
                "Build encapsulated components that manage their own state, then compose them to make complex UIs.",
            likesCount: 2,
            dislikesCount: 2,
        },
        {
            id: 4,
            message:
                "We don’t make assumptions about the rest of your technology stack, so you can develop new features in React without rewriting existing code",
            likesCount: 7,
            dislikesCount: 0,
        },
        { id: 5, message: "Have a good day!!!!", likesCount: 5, dislikesCount: 4 },
    ],
    profile: null,
    status: "",
    isFetching: true,
};

export const fetchProfile = createAsyncThunk("profile/fetchProfile", async (userId: number) => {
    try {
        return await profileAPI.getProfile(userId);
    } catch (e) {
        Notification(e.message);
    }
});

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchProfile.pending.type]: state => {
            state.isFetching = true;
        },
        [fetchProfile.fulfilled.type]: (state: ProfileState, action: PayloadAction<UserProfile>) => {
            const { payload } = action;
            state.isFetching = false;
            state.profile = payload;
        },
    },
});

// export const { toggleFollowingProgress } = usersSlice.actions;
export default profileSlice.reducer;
