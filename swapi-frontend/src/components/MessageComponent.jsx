import React from "react";
import styled from "styled-components";

const MessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 200px;
`;

function MessageComponent({ message }) {
  return message ? <MessageContainer>{message}</MessageContainer> : null;
}

export default MessageComponent;
