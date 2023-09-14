import React from "react";
import { GoogleOutlined, FacebookFilled } from "@ant-design/icons";
import styled from "styled-components";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div className="no-email">
        <h3>MUA HÀNG KHÔNG CẦN ĐĂNG NHẬP</h3>
        <div className="noti-email">
          Chúng tôi sẽ gửi thông tin đặt hàng đến email của bạn
        </div>
        <form action="">
          <input type="email" placeholder="Địa chỉ email" />
          <div className="btn">
            <Button black>Tiếp Tục</Button>
            <Button
              type="button"
              onClick={() => {
                navigate("/checkout/#shipping");
              }}
            >
              Tôi không có địa chỉ email
            </Button>
          </div>
        </form>
      </div>

      <form className="form-login" action="">
        <h3>Đăng Nhập</h3>
        <div className="create">
          <span>Bạn chưa có tài khoản?</span>
          <a href="">Tạo tài khoản</a>
        </div>
        <div className="control">
          <input
            type="text"
            placeholder="Địa chỉ email hoặc số điện thoại của bạn"
          />
          <input type="password" placeholder="Mật khẩu" />
        </div>
        <div className="btn">
          <div className="btn-submit">
            <Button>Đăng Nhập</Button>
            <a href="/">Quên mật khẩu?</a>
          </div>

          <div className="social-login">
            <div className="facebook">
              <Button>
                <FacebookFilled />
                <span>Đăng nhập bằng facebook</span>
              </Button>
            </div>

            <div className="google">
              <Button>
                <GoogleOutlined />
                <span>Đăng nhập bằng google</span>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  transition: all 0.2s;
  padding: 0 15px;

  h3 {
    text-transform: uppercase;
    margin-bottom: 15px;
    font-size: 24px;
    font-weight: 700;
  }
  .no-email {
    margin-bottom: 75px;
    .noti-email {
      margin-bottom: 42px;
      font-size: 16px;
      color: #666666;
    }
    .btn {
      display: flex;
      padding-left: 0;
      padding-right: 0;
      margin-top: 12px;

      button {
        width: auto;
        min-width: 120px;
        + button {
          margin-left: 20px;
        }
      }
    }
    input {
      display: block;
      width: 100%;
      border: none;
      border-bottom: 2px solid #eee;
      height: 40px;
      color: #000;
    }
  }

  .form-login {
    .create {
      a {
        color: #000;
        text-decoration: underline;
        margin-left: 5px;
      }
      color: #000;
      margin-bottom: 28px;
    }
    .control {
      display: flex;
      justify-content: space-between;
      input {
        color: #000;
        border: none;
        border-bottom: 2px solid #eee;
        margin-bottom: 15px;
        width: 50%;
        + input {
          margin-left: 20px;
        }
      }
    }
    .btn {
      margin-top: 27px;
      padding: 0;
      .btn-submit {
        display: flex;
        align-items: center;
        button {
          width: auto;
        }
        a {
          color: #9a9a9a;
          margin-left: 20px;
        }
      }
      .social-login {
        margin-top: 20px;
        display: flex;
        align-items: center;
        button {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          position: relative;
          overflow: hidden;

          svg {
            font-size: 22px;
            margin-right: 10px;
          }
          span {
            text-transform: uppercase;
            font-size: 14px;
            font-weight: 500;
            letter-spacing: 0.5px;
          }

          &::before {
            content: "";
            display: block;
            width: 100%;
            height: 40px;
            position: absolute;
            top: -100%;
            left: -100%;
            -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
          }
          &:hover::before {
            left: 100%;
            top: 100%;
            background: rgba(255, 255, 255, 0.6);
            -webkit-transition: all 1.5s;
            transition: all 1.5s;
          }
        }
        .facebook {
          margin-right: 10px;
          margin-bottom: 15px;
          button {
            background-color: #4267b2 !important;
            border-color: #4267b2;
            padding: 10px;
          }
        }
        .google {
          margin-left: 10px;
          margin-bottom: 15px;
          button {
            background-color: #dc5246 !important;
            border-color: #dc5246;
            padding: 10px;
          }
        }
      }
    }
  }
`;

export default Login;
