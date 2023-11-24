import React from "react";
import styled from "styled-components";

const MessageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 20px;
  text-align: center;
  z-index: 999;
`;

const LoggedInMessage = () => {
  return (
    <MessageContainer>
      You are already logged in. No need to login again.
    </MessageContainer>
  );
};

export default LoggedInMessage;
