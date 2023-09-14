import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import Menu from "./Menu";
import { memo } from "react";

const Navbar = () => {
  return (
    <Wrapper>
      <Top>
        <Link to="/dashboard">
          <Image src="https://elise.vn/media/favicon/stores/2/favico_192x192.png" />
          <h2>Elise</h2>
        </Link>
      </Top>
      <Content>
        <Menu />
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 260px;
  height: 100vh;
  overflow: auto;
  background-color: #121430;
  height: 100vh;
  overflow-y: auto;
  position: fixed;
`;

const Top = styled.div`
  padding: 20px 16px;
  a {
    display: flex;
    justify-content: left;
    align-items: center;
    h2 {
      margin: 0;
      margin-left: 10px;
      color: #fff;
    }
    img {
      width: 60px;
      filter: grayscale(100%);
    }
  }
`;

const Content = styled.div``;

export default memo(Navbar);
