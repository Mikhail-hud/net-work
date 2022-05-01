import { Post, UserProfile } from "../profileTypes";

export interface ProfileState {
    posts: Array<Post>;
    profile: UserProfile;
    status: string;
    isFetching: boolean;
    isPhotoSaving: boolean;
    isProfileSaving: boolean;
    editMode: boolean;
    profileDataFormError: Array<string>;
}
