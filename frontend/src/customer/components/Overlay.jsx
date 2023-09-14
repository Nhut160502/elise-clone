import React from "react";
import styled from "styled-components";

const Overlay = ({ active, onclick }) => {
  return (
    <Wrapper
      id="overlay"
      className={active && "active"}
      onClick={() => onclick()}
    ></Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  transition: all 0.4s;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
  z-index: 1;
  transition: all 0.4s;
  opacity: 0;
  visibility: hidden;
  &.active {
    opacity: 1;
    visibility: visible;
  }
`;
export default Overlay;
