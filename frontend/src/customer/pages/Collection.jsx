import { Col, Row } from "react-bootstrap";
import { styled } from "styled-components";

function Collection() {
  return (
    <Wrapper>
      <Item>
        <Row>
          <Col sm="8" className="left">
            <a href="">
              <img src="https://elise.vn/media/wysiwyg/BANNER/cv-shades-of-lace.jpg" />
            </a>
          </Col>
          <Col sm="4" className="right">
            <div className="infor">
              <h1>SHADES OF LACE</h1>
              <p className="brand">ELISE</p>
              <p>September 2023</p>
            </div>
          </Col>
        </Row>
      </Item>

      <Item>
        <Row>
          <Col sm="8" className="left">
            <a href="">
              <img src="https://elise.vn/media/wysiwyg/BANNER/cv-shades-of-lace.jpg" />
            </a>
          </Col>
          <Col sm="4" className="right">
            <div className="infor">
              <h1>SHADES OF LACE</h1>
              <p className="brand">ELISE</p>
              <p>September 2023</p>
            </div>
          </Col>
        </Row>
      </Item>

      <Item>
        <Row>
          <Col sm="8" className="left">
            <a href="">
              <img src="https://elise.vn/media/wysiwyg/BANNER/cv-shades-of-lace.jpg" />
            </a>
          </Col>
          <Col sm="4" className="right">
            <div className="infor">
              <h1>SHADES OF LACE</h1>
              <p className="brand">ELISE</p>
              <p>September 2023</p>
            </div>
          </Col>
        </Row>
      </Item>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const Item = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  width: 100%;
  max-width: 1810px;
  margin: 0 auto 50px auto;
  a {
    display: block;
    img {
      width: 100%;
    }
  }
  h1 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 0;
  }
  .left {
    padding-left: 1cm;
  }
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    .brand {
      text-transform: uppercase;
      font-size: 18px;
      margin: 10px 0;
    }
  }
`;
export default Collection;
