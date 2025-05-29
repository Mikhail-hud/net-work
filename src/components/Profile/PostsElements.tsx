import { List } from "antd";
import { FC } from "react";
import { User } from "@app/types/userType";
import { PostItem } from "@app/components";
import { NewLikeData, Post, UpdatedPostData } from "@app/types/profileTypes";

interface PostsElementsProps {
    user: User;
    isOwner: boolean;
    posts: Array<Post>;
    onPostDelete: (id: string) => void;
    onLikeAdd: (newLikeData: NewLikeData) => void;
    onPostUpdate: (updatedPostData: UpdatedPostData) => void;
}

export const PostsElements: FC<PostsElementsProps> = ({
    posts,
    onLikeAdd,
    onPostDelete,
    user,
    onPostUpdate,
    isOwner,
}) => {
    return (
        <List
            bordered={false}
            dataSource={[...posts].reverse()}
            itemLayout="vertical"
            pagination={{ pageSize: 5 }}
            renderItem={item => (
                <PostItem
                    key={item.id}
                    post={item}
                    user={user}
                    onLikeAdd={onLikeAdd}
                    onPostDelete={onPostDelete}
                    onPostUpdate={onPostUpdate}
                    isOwner={isOwner}
                />
            )}
        />
    );
};
