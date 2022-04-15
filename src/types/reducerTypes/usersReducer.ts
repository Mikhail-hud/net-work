import { NetWorkUser } from "../usersType";

export interface UsersState {
    users: Array<NetWorkUser>;
    totalCount: number;
    isFetching: boolean;
    followingInProgress: Array<number>;
}
