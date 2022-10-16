import React, { useState } from "react";
import styled from "styled-components";
import CommentListItem from "./CommentListItem";
import ReplyList from "./ReplyList";

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

function CommentList(props) {
  const { comments } = props;
  // const [reReply, setReReply] = useState(false);
  return (
    <>
      {comments.map((comment, idx) => (
        <div key={idx}>
          <CommentListItem key={comment.id} comment={comment} />
          {/* {reReply ? "" : <></>} */}
          <ReplyList comment={comment} />
        </div>
      ))}
    </>
  );
}

export default CommentList;
