import React, { useState } from "react";
import styled from "styled-components";
import Checkbox from "./Checkbox";
import Button from "./Button";

const Payment = () => {
  const [active, setActive] = useState("");
  return (
    <Wrapper>
      <Title>Phương thức thanh toán</Title>
      <Content>
        <Item onClick={() => setActive("insta")}>
          <div className="content">
            <Checkbox checked={active === "insta" && true} />
            <span className="insta">Insta Payment</span>
          </div>
          <div className={active === "insta" ? "action active" : "action"}>
            <Button black>Tiếp tục</Button>
          </div>
        </Item>
        <Item onClick={() => setActive("vnpay")}>
          <div className="content">
            <Checkbox checked={active === "vnpay" && true} />
            <span className="vnpay">CỔNG THANH TOÁN VNPAY</span>
          </div>
          <div className={active === "vnpay" ? "action active" : "action"}>
            <Button black>Tiếp tục</Button>
          </div>
        </Item>
        <Item onClick={() => setActive("onepay")}>
          <div className="content">
            <Checkbox checked={active === "onepay" && true} />
            <span className="onepay">CỔNG THANH TOÁN onepay</span>
          </div>
          <div className={active === "onepay" ? "action active" : "action"}>
            <Button black>Tiếp Tục</Button>
          </div>
        </Item>
        <Item onClick={() => setActive("bank")}>
          <div className="content">
            <Checkbox checked={active === "bank" && true} />
            <span className="bank">Chuyển Khoản</span>
          </div>
          <div className={active === "bank" ? "action active" : "action"}>
            <p>
              <div id="bank-details">
                <p>
                  Vui lòng chuyển khoản giá trị đơn hàng tới tài khoản dưới đây
                  theo theo cú pháp: "TÊN + SỐ ĐIỆN THOẠI". Ví dụ: TRANG -
                  84987986689
                </p>
                <div id="bidv" class="bank-item">
                  <div class="bank-details">
                    <div class="bank-name">BIDV chi nhánh Hoàn Kiếm Hà Nội</div>
                    <div class="bank-owner">
                      CTK: CONG TY TNHH Thời Trang Elise
                    </div>
                    <div class="bank-account">STK: 1241 000 600 6886</div>
                  </div>
                </div>
              </div>
            </p>
            <Button black>Đặt hàng</Button>
          </div>
        </Item>
        <Item onClick={() => setActive("cod")}>
          <div className="content">
            <Checkbox checked={active === "cod" && true} />
            <span className="cod">THANH TOÁN KHI NHẬN HÀNG (COD)</span>
          </div>
          <div className={active === "cod" ? "action active" : "action"}>
            <Button black>Tiếp Tục</Button>
          </div>
        </Item>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const Title = styled.div`
  margin-bottom: 47px;
  font-size: 26px;
  font-weight: 500;
  line-height: normal;
  color: #000;
  text-transform: uppercase;
`;
const Content = styled.div``;
const Item = styled.div`
  margin-bottom: 45px;
  padding: 16px;
  .content {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    position: relative;

    span {
      text-transform: uppercase;
      padding-left: 95px;
      font-size: 20px;
      line-height: normal;
      color: #000;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      height: 60px;
      &::before {
        position: absolute;
        left: 35px;
        content: "";
        width: 65px;
        height: 65px;
        display: block;
        background-size: contain;
        background-repeat: no-repeat;
        flex-shrink: 0;
      }
    }
  }

  span.insta::before {
    background-image: url("https://elise.vn/static/version1692167815/frontend/Magenest/elise/vi_VN/images/insta.svg");
    bottom: -20px;
  }
  span.vnpay::before {
    background-image: url("https://elise.vn/static/version1692167815/frontend/Magenest/elise/vi_VN/images/vnpay.png");
  }
  span.onepay::before {
    background-image: url("https://elise.vn/static/version1692167815/frontend/Magenest/elise/vi_VN/images/logo-onepay.png");
    bottom: -28px;
  }
  span.bank::before {
    background-image: url("https://elise.vn/static/version1692167815/frontend/Magenest/elise/vi_VN/images/bank.png");
  }
  span.cod::before {
    background-image: url("https://elise.vn/static/version1692167815/frontend/Magenest/elise/vi_VN/images/ttgiaohang.png");
  }

  .action {
    height: 0px;
    overflow-y: hidden;
    button {
      width: 160px;
    }
    &.active {
      height: auto;
    }
    p {
      color: #666;
      line-height: 1.75;
      font-size: 16px;
      margin-bottom: 10px;
    }
    .bank-details {
      margin-top: 20px;
    }
    #bidv {
      display: flex;
      align-items: center;
      .bank-details {
        padding-left: 60px;
        text-transform: uppercase;
        color: #000;
        line-height: 1.714285714;
      }
    }
  }
`;

export default Payment;
