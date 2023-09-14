import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { RightOutlined } from "@ant-design/icons";
import Login from "../components/Login";
import Shipping from "../components/Shipping";
import Cart from "../components/Cart";
import { useLocation } from "react-router-dom";
import Payment from "../components/Payment";

const Checkout = () => {
  const [hash, setHash] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (!window.location.hash) {
      window.location.replace("/checkout/#login");
      window.history.pushState({}, null, window.location.href);
    }
    setHash(window.location.hash.replace("#", ""));
  }, [location]);

  return (
    <Wrapper>
      <Progress>
        <li id="login">
          <span>Chi tiết</span>
          <RightOutlined />
        </li>
        <li>
          <span>Vận chuyển</span>
          <RightOutlined />
        </li>
        <li>
          <span>Thanh toán</span>
          <RightOutlined />
        </li>
        <li>
          <span>Hoàn thành</span>
        </li>
      </Progress>
      <Notification>
        <p>
          Vui lòng gọi theo số <b>0386998080</b> (miễn phí) để đặt đơn hàng
          nhanh chóng
        </p>
      </Notification>
      <Content>
        <Row>
          <Col sm="6" className="left">
            {hash === "login" && <Login />}
            {hash === "shipping" && <Shipping />}
            {hash === "payment" && <Payment />}
          </Col>
          <Col sm="6" className="right">
            <Cart />
          </Col>
        </Row>
      </Content>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  max-width: 1200px;
  margin: auto;
  min-height: 75vh;
  padding: 78px 15px 120px;

  .left {
    padding-right: 44px;
    padding-left: 0;
    width: calc(100% - 444px);
  }
  .right {
    padding-left: 44px;
    width: 444px;
    padding-right: 0;
  }
`;
const Progress = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 26px;
  margin-bottom: 16px;
  border-bottom: 1px solid #eee;

  li {
    text-transform: uppercase;
    margin-right: 30px;
    color: #b3b3b3;
    display: flex;
    align-items: center;
    &::before {
      content: "0" counter(i) ".";
      counter-increment: i;
    }
    svg {
      display: inline-block;
      margin-left: 30px;
      font-size: 10px;
      color: #b3b3b3;
    }
  }
`;
const Notification = styled.div`
  text-align: center;
  margin-bottom: 70px;
  font-size: 16px;
  color: #000;
`;
const Content = styled.div``;

export default Checkout;
