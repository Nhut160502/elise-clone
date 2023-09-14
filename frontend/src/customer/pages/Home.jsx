import { styled } from "styled-components";
import Slibar from "../components/Slibar";
import Product from "../components/Product";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "../components/Button";
function Home() {
  return (
    <Wrapper>
      <Slibar />
      <Contaner>
        <Top>
          <h3>New Arrivals</h3>
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
          </Row>
        </Content>
        <Bottom>
          <Link>
            <Button black>Xem Thêm</Button>
          </Link>
        </Bottom>
      </Contaner>
    </Wrapper>
  );
}
const Wrapper = styled.div``;
const Contaner = styled.div`
  max-width: 1825px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 60px;
`;

const Top = styled.div`
  margin-top: 48px;
  margin-bottom: 30px;
  font-size: 30px;
  line-height: 1.2;
  text-align: center;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div``;

export default Home;
