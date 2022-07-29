import React from "react";
import { Post } from "../types";

const PostCard = ({ post }: { post: Post }) => {
  return (
    <div>
      {post.title}
      {post.excerpt}
    </div>
  );
};

export default PostCard;
