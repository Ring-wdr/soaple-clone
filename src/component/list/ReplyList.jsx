import React from "react";
import styled from "styled-components";
import CommentListItem from "./CommentListItem";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  /* & > * {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  } */
`;

function ReplyList(props) {
  const { comment } = props;
  return (
    <Wrapper>
      {comment.reply.map((comment, idx) => (
        <CommentListItem key={comment.id} comment={comment} />
      ))}
    </Wrapper>
  );
}

export default ReplyList;
