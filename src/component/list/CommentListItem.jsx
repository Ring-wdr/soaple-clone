import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: calc(100% - 32px);
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border: 1px solid grey;
  border-radius: 8px;
  cursor: pointer;
  background: ${(props) => (props.pid ? "lightgray" : "white")};
  :hover {
    background: ${(props) => (props.pid ? "gray" : "lightgray")};
  }
`;

const ContentText = styled.p`
  font-size: 14px;
`;

function CommentListItem({ comment }) {
  // const { comment } = props;

  const clickDelete = (event) => {
    console.log(comment.id);
  };

  return (
    <>
      <Wrapper key={comment.id} pid={comment.pid}>
        <ContentText>{comment.nickname}</ContentText>
        <ContentText>{comment.content}</ContentText>
        {comment.pid ? null : <button>대댓글 달기</button>}
        <button>수정</button>
        <button onClick={clickDelete}>삭제</button>
      </Wrapper>
      {/* {comment.reply.map((replyComment, idx) => (
        <Wrapper key={replyComment.id} pid={replyComment.pid}>
          <ContentText>{replyComment.nickname}</ContentText>
          <ContentText>{replyComment.content}</ContentText>
          <button>수정</button>
          <button onClick={clickDelete}>삭제</button>
        </Wrapper>
      ))} */}
    </>
  );
}

export default CommentListItem;
