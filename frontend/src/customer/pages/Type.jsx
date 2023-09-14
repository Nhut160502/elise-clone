import { styled } from "styled-components";
import {
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useEffect } from "react";

function Type() {
  useEffect(() => {
    window.history.replaceState(null, null, "/thoi-trang-nu");
  }, []);
  return (
    <Wrapper>
      <Top>
        <Banner>
          <img src="https://elise.vn/media/wysiwyg/BANNER/cv-shades-of-lace.jpg" />
        </Banner>
        <Social>
          <div className="item">
            <a href="">
              <FacebookOutlined />
              Facebook
            </a>
          </div>
          <div className="item">
            <a href="">
              <InstagramOutlined />
              Instagram
            </a>
          </div>
          <div className="item">
            <a href="">
              <YoutubeOutlined />
              Youtube
            </a>
          </div>
          <div className="item">
            <a href="">
              <FacebookOutlined />
              Titok
            </a>
          </div>
          <div className="item">
            <a href="">
              <FacebookOutlined />
              Zalo
            </a>
          </div>
        </Social>
      </Top>
      <Content>
        <Row>
          <Col sm="3">
            <Product />
          </Col>
          <Col sm="3">
            <Product />
          </Col>
          <Col sm="3">
            <Product />
          </Col>
          <Col sm="3">
            <Product />
          </Col>
          <Col sm="3">
            <Product />
          </Col>
          <Col sm="3">
            <Product />
          </Col>
          <Col sm="3">
            <Product />
          </Col>
          <Col sm="3">
            <Product />
          </Col>
          <Col sm="3">
            <Product />
          </Col>
          <Col sm="3">
            <Product />
          </Col>
          <Col sm="3">
            <Product />
          </Col>
          <Col sm="3">
            <Product />
          </Col>
        </Row>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-bottom: 70px;
`;
const Top = styled.div`
  max-width: 1825px;
  margin: auto auto;
  padding-left: 15px;
  padding-right: 15px;
  min-height: 40vh;
`;
const Banner = styled.div`
  img {
    width: 100%;
  }
`;

const Social = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  .item + .item + .item {
  }
  .item {
    margin-right: 20px;
    a:hover {
      text-decoration: underline;
    }
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #000;
      margin: 5px 0;
      text-transform: uppercase;
      font-size: 16px;
      svg {
        margin-right: 3px;
      }
    }
  }
`;
const Content = styled.div``;

export default Type;
