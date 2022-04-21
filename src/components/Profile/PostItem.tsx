import React, { useState } from "react";
import { Tooltip, Avatar, Comment } from "antd";
import { logo } from "../../assets/img/common";
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled, DeleteOutlined } from "@ant-design/icons";
import {
    ACCESS_MESSAGE_AUTORIZATION_DENIED,
    ACCESS_DESCRIPTION_AUTORIZATION_DENIED,
} from "../../constants/accessConstans";
import { useAppSelector } from "../../hooks";
import { Post } from "../../types/profileTypes";
import moment from "moment";
import { Notification } from "../presentational";
import { User } from "../../types/userType";
import { Link } from "react-router-dom";
import { PROFILE_PAGE_PATH } from "../../constants/pathConstants";

type Props = {
    user: User;
    post: Post;
    onAddDislike: (id: number) => void;
    onAddLike: (id: number) => void;
    onDeletePost: (id: number) => void;
};

const PostItem: React.FC<Props> = ({ post, onAddLike, onAddDislike, onDeletePost, user }): JSX.Element => {
    const { id, likesCount, dislikesCount, postText, postUserId } = post;
    const { isAuth } = useAppSelector(state => state.authReducer);

    const [action, setAction] = useState<"liked" | "disliked">();

    const handleLike = (id: number): void => {
        onAddLike(id);
        setAction("liked");
    };

    const handleDeletePost = (id: number): void => {
        if (isAuth) {
            onDeletePost(id);
        } else {
            Notification(ACCESS_MESSAGE_AUTORIZATION_DENIED, ACCESS_DESCRIPTION_AUTORIZATION_DENIED);
        }
    };

    const handleDislike = (id: number): void => {
        onAddDislike(id);
        setAction("disliked");
    };
    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
            <span onClick={() => handleLike(id)}>
                {action === "liked" ? <LikeFilled /> : <LikeOutlined />}
                <span className="comment-action">{likesCount}</span>
            </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
            <span onClick={() => handleDislike(id)}>
                {action === "disliked" ? <DislikeFilled /> : <DislikeOutlined />}
                <span className="comment-action">{dislikesCount}</span>
            </span>
        </Tooltip>,
        <span key="comment-basic-reply-to">Reply to</span>,
        user.id === postUserId && (
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
            author={post?.userFullName}
            avatar={
                <Link to={user.id === postUserId ? PROFILE_PAGE_PATH : `/profile/` + postUserId}>
                    <Avatar src={post?.userPhoto ?? logo} alt="post_profile_photo" />
                </Link>
            }
            content={<p>{postText}</p>}
            datetime={
                <Tooltip title={moment().format("MMM DD, YYYY, hh:mm a")}>
                    <span>{moment(post?.postDate).fromNow()}</span>
                </Tooltip>
            }
        />
    );
};

export default PostItem;
