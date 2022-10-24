import React from "react";
import styled from "styled-components";
import PostListItem from "./PostListItem";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  & > * {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

function PostList({ posts, category, onClickItem }) {
  

  return (
    <Wrapper>
      {posts.map((post, idx) => (
        <PostListItem
          key={post.id}
          category={category}
          post={post}
          onClick={() => {
            onClickItem(post);
          }}
        />
      ))}
    </Wrapper>
  );
}

export default PostList;
