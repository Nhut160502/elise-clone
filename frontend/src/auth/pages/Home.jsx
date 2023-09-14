import { useSelector } from "react-redux";
import { styled } from "styled-components";

const Home = () => {
  return <Wrapper>Home </Wrapper>;
};

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 90px);
  background-color: #1e2142;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default Home;
