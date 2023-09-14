import { styled } from "styled-components";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../untils/aixos";
import { loginSuccess } from "../providers/authSlice";
import { useNavigate } from "react-router-dom";

const DefaultLayout = memo(({ children }) => {
  const accessToken = useSelector((state) => state.auth?.user?.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkToken = async () => {
    if (accessToken) {
      try {
        await axios.post("/auth", { token: accessToken });
      } catch (error) {
        dispatch(loginSuccess(null));
        navigate("/dashboard/login");
      }
    }
  };
  useEffect(() => {
    checkToken();
  }, []);

  return (
    <Wrapper>
      <Navbar />
      <Layout>
        <Header />
        <Container>{children}</Container>
        <Footer>Footer</Footer>
      </Layout>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;
const Layout = styled.div`
  padding-left: 260px;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;
const Container = styled.div`
  padding-top: 40px;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 40px;
  height: calc(100vh - 190px);
  overflow-y: auto;
`;
const Footer = styled.div`
  width: 100%;
  background-color: #200121;
  height: 100px;
`;

export default DefaultLayout;
