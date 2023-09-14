import { Col, Row } from "react-bootstrap";
import { styled } from "styled-components";
import Product from "../components/Product";
import Quantity from "../components/Quantity";
import Button from "../components/Button";
import { Link } from "react-router-dom";

function Cart() {
  return (
    <Wrapper>
      <Top>
        <h1>Thông tin giỏ hàng</h1>
        <div className="desc">Bạn có 1 mặc hàng trong giỏ</div>
      </Top>
      <Content>
        <Row>
          <Col sm="4">
            <Product size className="item" />
            <Quantity
              className="qty"
              value={2}
              getValue={(value) => console.log(value)}
            />
          </Col>

          <Col sm="4">
            <Product size className="item" />
            <Quantity className="qty" />
          </Col>

          <Col sm="4">
            <Product size className="item" />
            <Quantity className="qty" />
          </Col>
        </Row>
      </Content>
      <Bottom>
        <Row className="content">
          <Col className="left">
            <Button>tiếp tục mua hàng</Button>
          </Col>
          <Col className="center">
            <div className="tit">
              Tổng đơn hàng đã đặt <span>1.000.000 VNĐ</span>
            </div>
            <div className="capti">
              <span>* Đã bao gồm thuế VAT</span>
            </div>
          </Col>
          <Col className="right">
            <Button>Cập nhật giỏ hàng</Button>
            <Link to={"/checkout/#shipping"}>Thanh toán</Link>
          </Col>
        </Row>
      </Bottom>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
  .item {
    margin-bottom: 0;
  }
  .qty {
    margin-left: 15px;
    margin-top: 10px;
  }
`;
const Top = styled.div`
  margin-bottom: 52px;
  h1 {
    text-transform: uppercase;
    margin-bottom: 12px;
    font-size: 24px;
    font-weight: 700;
    line-height: 1.428;
    letter-spacing: 0.5px;
  }
  .desc {
    font-size: 16px;
    color: #777;
    line-height: 1.75;
  }
`;

const Content = styled.div``;
const Bottom = styled.div`
  background: #fff;
  position: sticky;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  .content {
    text-align: center;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    position: relative;
    margin-top: 80px;
    padding: 37px 15px;

    .left {
      text-align: left;
      button {
        max-width: 50%;
      }
    }

    .right {
      display: flex;
      button {
        min-width: 180px;
      }
    }

    &::before {
      content: "";
      width: 300%;
      height: 1px;
      background: #eee;
      position: absolute;
      top: 0;
      right: 0;
      left: -100%;
    }
  }
`;
export default Cart;
