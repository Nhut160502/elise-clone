import { Row, Col, Form } from "react-bootstrap";
import { styled } from "styled-components";
import { Button } from "antd";
import ButtonCustom from "../components/Button";
import {
  MenuOutlined,
  SearchOutlined,
  PhoneOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  GoogleOutlined,
  FacebookFilled,
  CloseOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { openSlibar } from "../providers/slibarSlice";
import { memo, useEffect, useState } from "react";
import Overlay from "./Overlay";
import { closeCart, openCart } from "../providers/cartSlice";
import { Link } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state?.cart);
  const [sticky, setSticky] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setSticky(true);
    } else {
      setSticky(false);
    }
    return;
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Wrapper className={sticky && "pd"}>
      <Container className={sticky && "sticky"}>
        <Row>
          <Col sm="4">
            <Left>
              <Button
                icon={<MenuOutlined />}
                onMouseOver={() => dispatch(openSlibar())}
              />
              <Link to="/">
                <img src="http://localhost:8080/logo_color.png" alt="" />
              </Link>
            </Left>
          </Col>
          <Col sm="4">
            <Center>
              <Form>
                <span>Tìm Kiếm</span>
                <input type="text" />
                <Button icon={<SearchOutlined />} />
              </Form>
            </Center>
          </Col>
          <Col sm="4">
            <Right>
              <ul className="menu">
                <li className="menu-item">
                  <a href="">
                    <Button icon={<PhoneOutlined />} />
                    <span>Gọi Ngay</span>
                  </a>
                </li>
                <li className="menu-item">
                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenLogin(true);
                    }}
                  >
                    <Button icon={<UserOutlined />} />
                    <span>Tài Khoản</span>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="" onMouseLeave={() => dispatch(closeCart())}>
                    <Button
                      icon={<ShoppingCartOutlined />}
                      onMouseOver={() => dispatch(openCart())}
                    />
                  </a>
                  <Cart
                    className={cart.visible && "active"}
                    onMouseLeave={() => dispatch(closeCart())}
                    onMouseOver={() => dispatch(openCart())}
                  >
                    <div className="title">
                      <span>Giỏ hàng</span>
                    </div>
                    <div className="content">
                      <div className="empty">
                        <span>Không có mục nào trong giỏ hàng này</span>
                      </div>
                    </div>
                  </Cart>
                </li>
                <li className="menu-item">
                  <a href="">
                    <Button icon={<HeartOutlined />} />
                  </a>
                </li>
              </ul>
            </Right>
          </Col>
        </Row>
      </Container>
      <Login className={openLogin && "active"}>
        <div className="container">
          <div className="title">
            <span>Đăng Nhập</span>
          </div>
          <div className="close" onClick={() => setOpenLogin(false)}>
            <CloseOutlined />
          </div>
          <div className="create">
            <span>
              Bạn chưa có tài khoản?
              <a href="/create">Tạo tài khoản</a>
            </span>
          </div>
          <div className="form-login">
            <form action="">
              <div className="email">
                <input
                  type="text"
                  name="username"
                  placeholder="Địa chỉ email hoặc số điện thoại của bạn"
                />
              </div>
              <div className="email">
                <input type="password" name="username" placeholder="Mật khẩu" />
              </div>
              <div className="forget">
                <a href="">Quên mật khẩu?</a>
              </div>
              <div className="agree">
                <input type="checkbox" id="agree" />
                <label htmlFor="agree">
                  Tôi đồng ý Điều kiện - Điều khoản & Chính sách bảo mật của
                  Elise.
                </label>
              </div>
              <div className="btn">
                <ButtonCustom black>Đăng Nhập</ButtonCustom>
              </div>
            </form>
          </div>
          <div className="social-login">
            <div className="facebook">
              <ButtonCustom>
                <FacebookFilled />
                <span>Đăng nhập bằng facebook</span>
              </ButtonCustom>
            </div>

            <div className="google">
              <ButtonCustom>
                <GoogleOutlined />
                <span>Đăng nhập bằng google</span>
              </ButtonCustom>
            </div>
          </div>
        </div>
      </Login>
      <Overlay active={openLogin} onclick={() => setOpenLogin(false)} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  transition: all 0.4s ease;
  padding-bottom: 144px;
  &.pd {
    padding-bottom: 0;
  }
`;

const Login = styled.div`
  max-width: 450px;
  padding: 40px;
  background-color: #fff;
  position: fixed;
  right: -450px;
  transition: all 0.4s;
  z-index: 9999;
  background-color: #fff;
  height: 100vh;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  &.active {
    right: 0;
  }
  a {
    color: #9a9a9a;
    text-decoration: underline;
    &:hover {
      color: #a68242;
    }
  }
  .title {
    margin-bottom: 15px;
    span {
      font-size: 26px;
      line-height: 1;
      font-weight: 500;
      color: #000;
      text-transform: uppercase;
    }
  }
  .close {
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
    padding: 15px;
    font-size: 18px;
  }
  .create {
    margin-bottom: 40px;
    span {
      display: block;
      font-size: 16px;
      line-height: 1.75;
      color: #000;
      a {
        margin-left: 5px;
      }
    }
  }
  .form-login {
    margin-bottom: 40px;
    input {
      border: none;
      height: 40px;
      color: #000;
      margin-bottom: 15px;
    }
    .forget {
      margin-bottom: 10px;
    }
    .agree {
      cursor: pointer;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 15px;
      input {
        margin: 0;
        padding: 5px;
        width: 15px;
        height: 15px;
      }
      label {
        padding-left: 15px;
      }
    }
    .btn {
      width: 100%;
      padding: 0;
    }
  }
  .social-login {
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      svg {
        font-size: 22px;
        margin-right: 10px;
      }
      span {
        text-transform: uppercase;
        font-size: 16px;
        font-weight: 600;
      }
    }
    .facebook {
      margin-bottom: 15px;
      button {
        background-color: #4267b2 !important;
        border-color: #4267b2;
      }
    }
    .google {
      margin-bottom: 15px;
      button {
        background-color: #dc5246 !important;
        border-color: #dc5246;
      }
    }
  }
`;

const Cart = styled.div`
  &::before {
    content: "";
    position: absolute;
    top: -30px;
    width: 20%;
    height: 30px;
    right: 0;
  }
  &.active {
    opacity: 1;
    visibility: visible;
  }
  transition: all 0.4s;
  opacity: 0;
  visibility: hidden;
  position: absolute;
  background-color: #fff;
  display: block;
  top: 30px;
  margin-top: 22px;
  border: 1px solid #000;
  right: 0;
  width: 360px;
  padding: 25px 20px 40px;
  .title {
    border-bottom: 1px solid #ddd;
    font-size: 18px;
    font-weight: 500;
    line-height: 2.176;
    color: #000;
    span {
      text-transform: uppercase;
    }
  }
  .empty {
    margin-top: 20px;
    font-size: 16px;
    line-height: 1.75;
    font-weight: 400;
    color: #666;
    span {
      font-size: 16px;
      line-height: 1.75;
      font-weight: 400;
      color: #666;
    }
  }
`;

const Container = styled.div`
  position: fixed;
  width: 100%;
  z-index: 1;
  padding: 48px 40px;
  background: #fff;
  -webkit-transition: all 0.4s ease;
  transition: all 0.4s ease;
  &.sticky {
    box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    padding: 20px 40px;
  }
`;
const Left = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0 15px;
  img {
    width: 167px;
  }
  button {
    border: none !important;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      font-size: 20px;
    }
    margin-right: 10px;
  }
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    > span {
      display: inline-flex;
      margin-right: 15px;
      font-size: 18px;
      font-weight: 500;
      line-height: 1;
      text-transform: uppercase;
      white-space: nowrap;
      position: relative;
      top: 5px;
    }

    input {
      border: none;
      border-bottom: 1px solid #000;
      color: #000;
    }
    button {
      display: inline-block;
      margin-left: 10px;
      background: 0 0;
      border: none;
      line-height: 1;
      position: relative;
      top: 2px;
      svg {
        font-size: 22px;
      }
    }
  }
`;

const Right = styled.div`
  .menu {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    :last-child {
      margin-right: 0 !important;
    }
    li {
      padding-left: 20px;
      margin-right: 15px;
      position: relative;
      a {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #000;
        button {
          border: none;
          display: flex;
          justify-content: center;
          align-items: center;
          svg {
            font-size: 20px;
          }
        }
        span {
          font-size: 16px;
        }
      }
    }
  }
`;

export default memo(Header);
