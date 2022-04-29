import React from "react";
import { NewLikeData, Post } from "../../types/profileTypes";
import { PostItem } from "../../components";
import { User } from "../../types/userType";

type Props = {
    user: User;
    posts: Array<Post>;
    onAddLike: (newLikeData: NewLikeData) => void;
    onDeletePost: (id: number) => void;
};

const PostsElements: React.FC<Props> = ({ posts, onAddLike, onDeletePost, user }): JSX.Element => {
    return (
        <>
            {[...posts].reverse().map(post => {
                return (
                    <PostItem user={user} key={post.id} post={post} onAddLike={onAddLike} onDeletePost={onDeletePost} />
                );
            })}
        </>
    );
};

export default PostsElements;
