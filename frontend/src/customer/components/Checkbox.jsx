import React from "react";
import styled from "styled-components";

const Checkbox = ({ checked }) => {
  return (
    <Wrapper className={checked && "checked"}>
      <div></div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid #000;
  padding: 3px;
  border-radius: 50%;
  div {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  &.checked {
    div {
      background-color: #000;
    }
  }
`;

export default Checkbox;
