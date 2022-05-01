import React from "react";
import { Tooltip, Avatar, Comment, Typography, Badge } from "antd";
import { logo } from "../../assets/img/common";
import { LikeOutlined, LikeFilled, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../hooks";
import cn from "classnames";
import { NewLikeData, Post, UpdatedPostData, UserProfile } from "../../types/profileTypes";
import moment from "moment";
import { User } from "../../types/userType";
import { Link } from "react-router-dom";
import { PROFILE_PAGE_PATH } from "../../constants/pathConstants";
import { DATE_TWELVE_HOUR } from "../../constants/dateFormatConstants";
import { MAX_POST_LENGTH, USER_OWNER_NAME_PlACEHOLDER } from "../../constants/profileConstans";

const { Paragraph } = Typography;
type Props = {
    user: User;
    post: Post;
    onLikeAdd: (newLikeData: NewLikeData) => void;
    onPostUpdate: (updatedPostData: UpdatedPostData) => void;
    onPostDelete: (id: number) => void;
    isOwner: boolean;
};

const PostItem: React.FC<Props> = ({
    post,
    onLikeAdd,
    onPostDelete,
    user,
    onPostUpdate,
    isOwner,
    children,
}): JSX.Element => {
    const { id, likes, postText, profile, postDate, edited } = post;
    const { isAuth } = useAppSelector(state => state.authReducer);
    const likeDislikeSwitch = likes?.usersProfile?.some(profile => profile?.userId === user?.id);
    const isActionAccessible =
        (user?.id === profile?.userId && isAuth && isOwner) ||
        (user?.id === profile?.userId && isAuth) ||
        (isOwner && isAuth);
    const isPostUpdateAccsesible = user?.id === profile?.userId && isAuth;

    const handlePostUpdate = newPostText => {
        onPostUpdate({
            id,
            postText: newPostText.trim(),
            postDate: moment().format(),
        });
    };

    const handleLike = (id: number, userProfile: UserProfile): void => {
        isAuth && onLikeAdd({ id, userProfile });
    };

    const handleDeletePost = (id: number): void => {
        onPostDelete(id);
    };

    const actions = [
        <Avatar.Group key="avatar-group" maxCount={2} size="small">
            {likes?.usersProfile?.map(profile => (
                <Tooltip
                    key={profile.userId}
                    title={user?.id === profile?.userId ? USER_OWNER_NAME_PlACEHOLDER : profile?.fullName}
                    placement="top"
                >
                    <Link to={user?.id === profile?.userId ? PROFILE_PAGE_PATH : `/profile/` + profile?.userId}>
                        <Avatar src={profile?.photos?.large} />
                    </Link>
                </Tooltip>
            ))}
        </Avatar.Group>,
        <span key="comment-basic-like" onClick={() => handleLike(id, user?.profile)}>
            {likeDislikeSwitch ? <LikeFilled /> : <LikeOutlined />}
        </span>,
        <span key="comment-basic-reply-to">
            Reply <EditOutlined />
        </span>,
        isActionAccessible && (
            <span key="comment-basic-delete" onClick={() => handleDeletePost(id)}>
                Delete <DeleteOutlined />
            </span>
        ),
    ];

    return (
        <Comment
            className="post-item"
            actions={actions}
            key={id}
            author={user?.id === profile?.userId ? USER_OWNER_NAME_PlACEHOLDER : profile?.fullName}
            avatar={
                <Badge
                    className={cn({ ["cursor-none"]: user?.id === profile?.userId && isOwner })}
                    showZero={false}
                    count={likes?.likesCount}
                >
                    <Link
                        className={cn({ ["cursor-none"]: user?.id === profile?.userId && isOwner })}
                        to={user?.id === profile?.userId ? PROFILE_PAGE_PATH : `/profile/` + profile?.userId}
                    >
                        <Avatar src={profile?.photos?.large ?? logo} alt="post-profile-photo" />
                    </Link>
                </Badge>
            }
            content={
                isPostUpdateAccsesible ? (
                    <Paragraph editable={{ onChange: handlePostUpdate, maxLength: MAX_POST_LENGTH }}>
                        {postText}
                    </Paragraph>
                ) : (
                    <p>{postText}</p>
                )
            }
            datetime={
                <Tooltip title={moment().format(DATE_TWELVE_HOUR)}>
                    <span>{edited ? `Edited ${moment(postDate).fromNow()}` : moment(postDate).fromNow()}</span>
                </Tooltip>
            }
        >
            {children}
        </Comment>
    );
};

export default PostItem;
