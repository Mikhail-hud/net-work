import React from "react";
import { NewLikeData, Post, UpdatedPostData } from "../../types/profileTypes";
import { PostItem } from "../../components";
import { User } from "../../types/userType";

type Props = {
    user: User;
    posts: Array<Post>;
    onLikeAdd: (newLikeData: NewLikeData) => void;
    onPostUpdate: (updatedPostData: UpdatedPostData) => void;
    onPostDelete: (id: number) => void;
    isOwner: boolean;
};

const PostsElements: React.FC<Props> = ({
    posts,
    onLikeAdd,
    onPostDelete,
    user,
    onPostUpdate,
    isOwner,
}): JSX.Element => {
    return (
        <>
            {[...posts].reverse().map(post => {
                return (
                    <PostItem
                        isOwner={isOwner}
                        user={user}
                        key={post.id}
                        onPostUpdate={onPostUpdate}
                        post={post}
                        onLikeAdd={onLikeAdd}
                        onPostDelete={onPostDelete}
                    />
                );
            })}
        </>
    );
};

export default PostsElements;
