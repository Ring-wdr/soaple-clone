import React, { useState } from "react";
import styled from "styled-components";
import Button from "../ui/Button";
import TextInput from "../ui/TextInput";
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

function CommentList({comments, category, postId}) {
  // const { comments } = props;
  const [reReply, setReReply] = useState([false, null]);
  const [repComment, setRepComment] = useState('')
  // const [pid, setPid] = useState(null)

  const commentChange = (event) => {
    setRepComment(event.target.value)
  };

  const appendReply = (pid) => {
    // console.log(e.target)
    console.log(reReply)
    setReReply([!reReply[0], pid])
  }
  
  const commentSubmit = async (event) => {
    if (repComment)
      try {
        // await (
        await fetch(
          `http://localhost:8080/api/post/reply/${category}/${postId}/2`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify([
              {
                pid: reReply[1],
                content: repComment,
              },
            ]),
          }
        );
        setRepComment('')
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
  };

  return (
    <>
      {comments.map((comment, idx) => (
        <div key={idx}>
          <CommentListItem key={comment.id} comment={comment} appendReply={appendReply}/>
          {reReply[0] && reReply[1] === comment.id ?  <>
            <TextInput height={40} value={repComment} onChange={commentChange} />
            <Button title="댓글 작성하기" onClick={commentSubmit} />
          </> : null}
          <ReplyList comment={comment} />
        </div>
      ))}
    </>
  );
}

export default CommentList;
