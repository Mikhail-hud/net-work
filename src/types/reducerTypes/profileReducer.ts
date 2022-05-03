import { Post, UserProfile } from "../profileTypes";

export interface ProfileState {
    posts: Array<Post>;
    profile: UserProfile;
    status: string;
    isProfileFetching: boolean;
    isPhotoSaving: boolean;
    isProfileSaving: boolean;
    editMode: boolean;
    profileDataFormError: Array<string>;
    isStatusFetching: boolean;
}
