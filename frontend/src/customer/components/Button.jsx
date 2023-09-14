import React from "react";
import { styled } from "styled-components";

const Button = ({ children, black, onClick, type }) => {
  let classess = "";
  if (black) {
    classess = "black";
  }

  return (
    <ButtonContainer
      type={type}
      onClick={(e) => onClick(e)}
      className={classess}
    >
      {children}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button`
  background-color: transparent;
  color: #000;
  padding: 20px;
  background-color: transparent;
  border: 1px solid #000;
  padding: 10px 20px;
  font-size: 14px;
  border-width: 2px;
  text-transform: uppercase;
  width: 100%;
  transition: all 0.2s;
  &.black {
    background-color: #000;
    color: #fff;
  }
  &:hover {
    background-color: #a68242;
    border-color: #a68242;
    color: #fff;
  }
  + button {
    margin-left: 5px;
  }
`;

export default Button;
