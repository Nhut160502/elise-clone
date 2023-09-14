import Footer from "../components/Footer";
import Header from "../components/Header";
import { styled } from "styled-components";
import Navbar from "../components/Navbar";
import { memo } from "react";
function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Header />
      <Navbar />
      <Container>{children}</Container>
      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled.div``;
const Container = styled.div``;

export default memo(DefaultLayout);
