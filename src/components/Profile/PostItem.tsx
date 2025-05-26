import { FC } from "react";
import cn from "classnames";
import moment from "moment";
import { useAppSelector } from "@hooks";
import { Link } from "react-router-dom";
import { logo } from "@assets/img/common";
import { User } from "@app/types/userType";
import { PROFILE_PAGE_PATH } from "@constants/pathConstants";
import { DATE_TWELVE_HOUR } from "@constants/dateFormatConstants";
import { Tooltip, Avatar, Typography, Badge, List, Flex, Space } from "antd";
import { MAX_POST_LENGTH, USER_OWNER_NAME_PlACEHOLDER } from "@constants/profileConstans";
import { NewLikeData, Post, UpdatedPostData, UserProfile } from "@app/types/profileTypes";
import { LikeOutlined, LikeFilled, DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface PostItemProps {
    user: User;
    post: Post;
    onLikeAdd: (newLikeData: NewLikeData) => void;
    onPostUpdate: (updatedPostData: UpdatedPostData) => void;
    onPostDelete: (id: number) => void;
    isOwner: boolean;
}

export const PostItem: FC<PostItemProps> = ({ post, onLikeAdd, onPostDelete, user, onPostUpdate, isOwner }) => {
    const { id, likes, postText, profile, postDate, edited } = post;
    const { isAuth } = useAppSelector(state => state.authReducer);
    const likeDislikeSwitch: boolean = likes?.usersProfile?.some(profile => profile?.userId === user?.id);
    const isActionAccessible: boolean =
        (user?.id === profile?.userId && isAuth && isOwner) ||
        (user?.id === profile?.userId && isAuth) ||
        (isOwner && isAuth);

    const isPostUpdateAccsesible: boolean = user?.id === profile?.userId && isAuth;

    const handlePostUpdate = (newPostText: string): void => {
        onPostUpdate({
            id,
            postText: newPostText.trim(),
            postDate: moment().format(),
        });
    };

    const handleLike = (id: number, userProfile: UserProfile): void => {
        isAuth && onLikeAdd({ id, userProfile });
    };

    const handleDeletePost = (id: number): void => onPostDelete(id);

    const actions = [
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
        <List.Item
            actions={actions}
            styles={{ actions: { marginLeft: "46px" } }}
            extra={
                likes?.usersProfile?.length > 0 && (
                    <Space direction="vertical" align="center">
                        <Typography.Title level={5}>Liked by</Typography.Title>
                        <Avatar.Group key="avatar-group" size="large">
                            {likes?.usersProfile?.map(profile => (
                                <Tooltip
                                    key={profile.userId}
                                    title={
                                        user?.id === profile?.userId ? USER_OWNER_NAME_PlACEHOLDER : profile?.fullName
                                    }
                                    placement="top"
                                >
                                    <Link
                                        to={
                                            user?.id === profile?.userId
                                                ? PROFILE_PAGE_PATH
                                                : `/profile/` + profile?.userId
                                        }
                                    >
                                        <Avatar src={profile?.photos?.large ?? logo} />
                                    </Link>
                                </Tooltip>
                            ))}
                        </Avatar.Group>
                    </Space>
                )
            }
        >
            <List.Item.Meta
                style={{ marginBottom: 0 }}
                avatar={
                    <Badge
                        showZero={false}
                        count={likes?.likesCount}
                        color="var(--colorPrimary)"
                        className={cn({ ["cursor-none"]: user?.id === profile?.userId && isOwner })}
                    >
                        <Link
                            className={cn({ ["cursor-none"]: user?.id === profile?.userId && isOwner })}
                            to={user?.id === profile?.userId ? PROFILE_PAGE_PATH : `/profile/` + profile?.userId}
                        >
                            <Avatar src={profile?.photos?.large ?? logo} alt="post-profile-photo" />
                        </Link>
                    </Badge>
                }
                title={
                    <Flex gap={8} align="end">
                        <Typography.Title level={5}>
                            {user?.id === profile?.userId ? USER_OWNER_NAME_PlACEHOLDER : profile?.fullName}
                        </Typography.Title>
                        <Tooltip title={moment().format(DATE_TWELVE_HOUR)}>
                            <Typography.Text type="secondary" style={{ fontSize: "12px" }}>
                                {edited ? `Edited ${moment(postDate).fromNow()}` : moment(postDate).fromNow()}
                            </Typography.Text>
                        </Tooltip>
                    </Flex>
                }
            />
            {isPostUpdateAccsesible ? (
                <Typography.Paragraph
                    style={{ marginLeft: "48px" }}
                    editable={{ onChange: handlePostUpdate, maxLength: MAX_POST_LENGTH }}
                >
                    {postText}
                </Typography.Paragraph>
            ) : (
                <Typography.Paragraph style={{ marginLeft: "48px" }}>{postText}</Typography.Paragraph>
            )}
        </List.Item>
    );
};
