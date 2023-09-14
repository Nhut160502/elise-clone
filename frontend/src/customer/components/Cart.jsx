import React, { useState } from "react";
import Button from "./Button";
import { Col, Row } from "react-bootstrap";
import { RightOutlined } from "@ant-design/icons";
import styled from "styled-components";

const Cart = () => {
  const [option, setOption] = useState(false);

  return (
    <Wrapper>
      <div className="title">
        <span>Giỏ hàng</span>
      </div>
      <div className="discount">
        <form action="">
          <input type="text" placeholder="Nhập mã giảm giá" />
          <Button black>Áp Dụng</Button>
        </form>
      </div>
      <div className="content">
        <div className="count">
          <span>
            Bạn có <span>1</span> sản phẩm trong giỏ hàng
          </span>
        </div>
        <div className="cart-content">
          <Item>
            <Row>
              <Col sm="3" className="image">
                <img
                  src="https://elise.vn/media/catalog/product/cache/bb52e54e5ec1828d48ae8bf7c98f9f69/f/f/ff2306028tssinv1.jpg"
                  alt=""
                />
              </Col>
              <Col sm="9" className="infor">
                <div className="name">
                  <span>SM LỤA TÍM THAN HT LOGO NƠ CỔ TƠ TRẮNG</span>
                </div>
                <div className="price">
                  <span>1.098.000 VND</span>
                </div>
                <div className="option" onClick={() => setOption(!option)}>
                  <span>Xem chi tiết</span>
                  <RightOutlined />
                </div>
                <div className={option ? "size active" : "size"}>
                  <span>Kích cở: M</span>
                </div>
              </Col>
            </Row>
          </Item>
          <Item>
            <Row>
              <Col sm="3" className="image">
                <img
                  src="https://elise.vn/media/catalog/product/cache/bb52e54e5ec1828d48ae8bf7c98f9f69/f/f/ff2306028tssinv1.jpg"
                  alt=""
                />
              </Col>
              <Col sm="9" className="infor">
                <div className="name">
                  <span>SM LỤA TÍM THAN HT LOGO NƠ CỔ TƠ TRẮNG</span>
                </div>
                <div className="price">
                  <span>1.098.000 VND</span>
                </div>
                <div className="option" onClick={() => setOption(!option)}>
                  <span>Xem chi tiết</span>
                  <RightOutlined />
                </div>
                <div className={option ? "size active" : "size"}>
                  <span>Kích cở: M</span>
                </div>
              </Col>
            </Row>
          </Item>
          <Item>
            <Row>
              <Col sm="3" className="image">
                <img
                  src="https://elise.vn/media/catalog/product/cache/bb52e54e5ec1828d48ae8bf7c98f9f69/f/f/ff2306028tssinv1.jpg"
                  alt=""
                />
              </Col>
              <Col sm="9" className="infor">
                <div className="name">
                  <span>SM LỤA TÍM THAN HT LOGO NƠ CỔ TƠ TRẮNG</span>
                </div>
                <div className="price">
                  <span>1.098.000 VND</span>
                </div>
                <div className="option" onClick={() => setOption(!option)}>
                  <span>Xem chi tiết</span>
                  <RightOutlined />
                </div>
                <div className={option ? "size active" : "size"}>
                  <span>Kích cở: M</span>
                </div>
              </Col>
            </Row>
          </Item>
          <Item>
            <Row>
              <Col sm="3" className="image">
                <img
                  src="https://elise.vn/media/catalog/product/cache/bb52e54e5ec1828d48ae8bf7c98f9f69/f/f/ff2306028tssinv1.jpg"
                  alt=""
                />
              </Col>
              <Col sm="9" className="infor">
                <div className="name">
                  <span>SM LỤA TÍM THAN HT LOGO NƠ CỔ TƠ TRẮNG</span>
                </div>
                <div className="price">
                  <span>1.098.000 VND</span>
                </div>
                <div className="option" onClick={() => setOption(!option)}>
                  <span>Xem chi tiết</span>
                  <RightOutlined />
                </div>
                <div className={option ? "size active" : "size"}>
                  <span>Kích cở: M</span>
                </div>
              </Col>
            </Row>
          </Item>
        </div>
        <div className="cart-bottom">
          <div className="subs-total">
            <span>1 sản phẩm</span>
            <span>1.098.000 VND</span>
          </div>
          <div className="subs-total">
            <span>Vận chuyển</span>
            <span>30.000 VND</span>
          </div>
          <div className="total">
            <h5>Tổng đơn hàng đã đặt</h5>
            <div>
              <h5>1.128.000 VND</h5>
              <span>* Đã bao gồm thuế VAT</span>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #fff;
  padding: 32px 30px;
  border: 1px solid #000;

  .title {
    display: block;
    margin-bottom: 30px;
    font-size: 26px;
    font-weight: 500;
    color: #000;
    text-transform: uppercase;
  }

  .discount {
    margin-bottom: 26px;
    form {
      display: flex;
      align-items: center;
    }
    input {
      height: 45px;
      background: #f7f7f7;
      line-height: normal;
      border: none;
      width: calc(100% - 105px);
      padding: 7px 0 7px 15px;
      font-size: 14px;
      color: #000;
    }
    button {
      width: 105px;
    }
  }

  .content {
    .count {
      margin-bottom: 4px;
      font-size: 14px;
      line-height: 1.5;
    }
    .cart-content {
      max-height: 310px;
      overflow-y: auto;
      overflow-x: hidden;
      .name {
        font-size: 15px;
        font-weight: 500;
        color: #000;
        line-height: normal;
        text-transform: uppercase;
      }
      .price {
        line-height: 1.75;
        font-size: 14px;
      }
      .option {
        cursor: pointer;
        color: #222;
        display: block;
        font-weight: 500;
        display: flex;
        align-items: center;
        line-height: 1.75;
        svg {
          margin-left: 5px;
          font-size: 10px;
          rotate: 90deg;
        }
      }
      .size {
        color: #222;
        display: block;
        font-weight: 500;
        font-size: 14px;
        line-height: 1.75;
        display: none;
        &.active {
          display: block;
        }
      }
    }
    .cart-bottom {
      margin-bottom: 0;
      margin-top: 25px;
      padding-top: 21px;
      border-top: 1px solid #000;
      .subs-total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        color: #666666;
        line-height: 1.75;
      }
      .total {
        margin-top: 24px;
        display: flex;
        justify-content: space-between;
        h5 {
          font-size: 16px;
        }
        div {
          text-align: right;
          span {
            font-size: 16px;
            color: #666666;
          }
        }
      }
    }
  }
`;

const Item = styled.div`
  padding-top: 15px;
  img {
    width: 100%;
  }
`;

export default Cart;
