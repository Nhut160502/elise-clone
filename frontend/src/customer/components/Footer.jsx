import { memo } from "react";
import { Row, Col } from "react-bootstrap";
import { styled } from "styled-components";

function Footer() {
  return (
    <Wrapper>
      <Top>
        <Row>
          <Col sm="3" className="item">
            <img
              src="https://elise.vn/media/wysiwyg/footer/return.png"
              alt=""
            />
            <p>7 NGÀY ĐỔI SẢN PHẨM NGUYÊN GIÁ</p>
            <a href="">Đổi trả sản phẩm trong 7 ngày</a>
          </Col>
          <Col sm="3" className="item">
            <img
              src="https://elise.vn/media/wysiwyg/footer/support.png"
              alt=""
            />
            <p>
              HOTLINE <a href="tel:19003060">1900 3060</a>
            </p>
            <a href="">8h00 - 17h00, T2 - T7 (Giờ hành chính)</a>
          </Col>
          <Col sm="3" className="item">
            <img src="https://elise.vn/media/wysiwyg/footer/store.png" alt="" />
            <p>HỆ THỐNG CỬA HÀNG</p>
            <a href="">120 cửa hàng trên toàn hệ thống</a>
          </Col>
          <Col sm="3" className="item">
            <img
              src="https://elise.vn/media/wysiwyg/footer/shipping.png"
              alt=""
            />
            <p>VẬN CHUYỂN</p>
            <a href="">Đồng giá 30k toàn quốc</a>
          </Col>
        </Row>
      </Top>
      <Center></Center>
      <Bottom></Bottom>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
`;
const Top = styled.div`
  .item {
    background-color: #000;
    text-align: center;
    padding: 18px 15px 15px;
    color: #fff;
    img {
      display: block;
      width: 27px;
      height: 27px;
      -o-object-fit: scale-down;
      object-fit: scale-down;
      margin: 0 auto 12px;
    }
    a {
      color: #fff;
    }
    p {
      margin-bottom: 0;
    }
  }
  .item + .item {
    max-width: calc(25% - 2px);
    margin-left: 1px;
  }
`;
const Center = styled.div``;
const Bottom = styled.div``;

export default memo(Footer);
