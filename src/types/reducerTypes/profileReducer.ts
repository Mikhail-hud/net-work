import { Post, UserProfile } from "../profileTypes";

export interface ProfileState {
    posts: Array<Post>;
    profile: UserProfile;
    status: string;
    isFetching: boolean;
}
