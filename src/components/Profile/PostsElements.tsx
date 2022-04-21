import React from "react";
import { Post } from "../../types/profileTypes";
import { PostItem } from "../../components";
import { User } from "../../types/userType";

type Props = {
    user: User;
    posts: Array<Post>;
    onAddDislike: (id: number) => void;
    onAddLike: (id: number) => void;
    onDeletePost: (id: number) => void;
};

const PostsElements: React.FC<Props> = ({ posts, onAddLike, onAddDislike, onDeletePost, user }): JSX.Element => {
    return (
        <>
            {[...posts].reverse().map(post => {
                return (
                    <PostItem
                        user={user}
                        key={post.id}
                        post={post}
                        onAddDislike={onAddDislike}
                        onAddLike={onAddLike}
                        onDeletePost={onDeletePost}
                    />
                );
            })}
        </>
    );
};

export default PostsElements;
