import styled from "styled-components";

const Wrapper = styled.div`
position: relative;
  padding: 16px;
  width: calc(100% - 32px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 720px;

  & > * {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

export { Wrapper, Container };
