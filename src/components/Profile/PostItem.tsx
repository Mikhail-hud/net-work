import React from "react";
import { Tooltip, Avatar, Comment } from "antd";
import { logo } from "../../assets/img/common";
import { LikeOutlined, LikeFilled, DeleteOutlined } from "@ant-design/icons";
import {
    ACCESS_MESSAGE_AUTORIZATION_DENIED,
    ACCESS_DESCRIPTION_AUTORIZATION_DENIED,
} from "../../constants/accessConstans";
import { useAppSelector } from "../../hooks";
import { NewLikeData, Post, UserProfile } from "../../types/profileTypes";
import moment from "moment";
import { Notification } from "../presentational";
import { User } from "../../types/userType";
import { Link } from "react-router-dom";
import { PROFILE_PAGE_PATH } from "../../constants/pathConstants";
import { DATE_TWELVE_HOUR } from "../../constants/dateFormatConstants";

type Props = {
    user: User;
    post: Post;
    onAddLike: (newLikeData: NewLikeData) => void;
    onDeletePost: (id: number) => void;
};

const PostItem: React.FC<Props> = ({ post, onAddLike, onDeletePost, user }): JSX.Element => {
    const { id, likes, postText, profile } = post;
    const { isAuth } = useAppSelector(state => state.authReducer);
    const likeDislikeSwitch = likes?.usersProfile?.some(profile => profile?.userId === user.id);

    const handleLike = (id: number, userProfile: UserProfile): void => {
        onAddLike({ id, userProfile });
    };

    const handleDeletePost = (id: number): void => {
        if (isAuth) {
            onDeletePost(id);
        } else {
            Notification(ACCESS_MESSAGE_AUTORIZATION_DENIED, ACCESS_DESCRIPTION_AUTORIZATION_DENIED);
        }
    };

    const actions = [
        <Avatar.Group
            key="avatar-group"
            maxCount={2}
            size="small"
            style={{ paddingRight: "5px" }}
            maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
        >
            {likes?.usersProfile?.map(profile => (
                <Tooltip key={profile.userId} title={profile?.fullName} placement="top">
                    <Link to={user?.id === profile?.userId ? PROFILE_PAGE_PATH : `/profile/` + profile?.userId}>
                        <Avatar src={profile?.photos?.large} />
                    </Link>
                </Tooltip>
            ))}
        </Avatar.Group>,
        <span key="comment-basic-like" onClick={() => handleLike(id, user?.profile)}>
            {likeDislikeSwitch ? <LikeFilled /> : <LikeOutlined />}
            <span className="comment-action">{likes?.likesCount}</span>
        </span>,
        <span key="comment-basic-reply-to">Reply to</span>,
        user?.id === profile.userId && (
            <span key="comment-basic-delete" onClick={() => handleDeletePost(id)}>
                Delete
                <DeleteOutlined />
            </span>
        ),
    ];

    return (
        <Comment
            actions={actions}
            key={id}
            author={profile?.fullName}
            avatar={
                <Link to={user?.id === profile?.userId ? PROFILE_PAGE_PATH : `/profile/` + profile?.userId}>
                    <Avatar src={profile?.photos?.large ?? logo} alt="post_profile_photo" />
                </Link>
            }
            content={<p>{postText}</p>}
            datetime={
                <Tooltip title={moment().format(DATE_TWELVE_HOUR)}>
                    <span>{moment(post?.postDate).fromNow()}</span>
                </Tooltip>
            }
        />
    );
};

export default PostItem;
