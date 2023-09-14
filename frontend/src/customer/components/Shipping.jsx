import React from "react";
import styled from "styled-components";
import Button from "./Button";
import Checkbox from "./Checkbox";

const Shipping = () => {
  return (
    <Wrapper>
      <div className="title">
        <h3>Địa chỉ giao hàng</h3>
      </div>
      <div className="content">
        <form action="" className="form-shipping">
          <div className="address">
            <div className="form_control">
              <div className="control">
                <label htmlFor="name">Tên</label>
                <input type="text" id="name" />
              </div>
              <div className="control">
                <label htmlFor="surname">Họ</label>
                <input type="text" id="surname" />
              </div>
            </div>

            <div className="form_control">
              <div className="control">
                <label htmlFor="province">Tỉnh/Thành phố</label>
                <select name="province" id="province">
                  <option>Vui Lòng Chọn Tỉnh/Thành Phố</option>
                </select>
              </div>
              <div className="control">
                <label htmlFor="district">Quận/Huyện</label>
                <select name="district" id="district">
                  <option>Vui Lòng Chọn Quận/Huyện</option>
                </select>
              </div>
            </div>

            <div className="form_control">
              <div className="control">
                <label htmlFor="ward">Phường/Xã</label>
                <select name="ward" id="ward">
                  <option>Vui Lòng Chọn Phường/Xã</option>
                </select>
              </div>
              <div className="control">
                <label htmlFor="address">Địa chỉ</label>
                <input type="text" id="address" />
              </div>
            </div>

            <div className="form_control">
              <div className="control">
                <label htmlFor="note">Ghi chú</label>
                <input type="text" id="note" placeholder="Ghi chú đơn hàng" />
              </div>
              <div className="control">
                <label htmlFor="numberphone">Điện thoại</label>
                <div className="group">
                  <input
                    type="text"
                    name="numberphone[prefix]"
                    readOnly
                    value="+84"
                  />
                  <input type="text" id="numberphone" placeholder="987986689" />
                </div>
                <div className="message">
                  <span>Số điện thoại có dạng +84 987986689</span>
                </div>
              </div>
            </div>
          </div>

          <div className="method">
            <div className="title">
              <h3>Chọn phương thức giao hàng của bạn</h3>
            </div>
            <div className="desc">
              <span>
                Phí vận chuyển dựa trên trọng lượng kiện hàng và địa điểm giao
                hàng
              </span>
            </div>
            <div className="item-shipping">
              <Checkbox checked />
              <span>Giao hàng tiết kiệm</span>
            </div>
          </div>
          <div className="btn">
            <Button black>Tiếp tục</Button>
          </div>
        </form>
      </div>
      <div className="bottom">
        <div className="item-shipping">
          <Checkbox checked />
          <span>Giao hàng tiết kiệm</span>
        </div>
        <div className="fee">
          <span>30.000 VND</span>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  transition: all 0.2s;
  padding: 0 15px;
  .title {
    margin-bottom: 10px;
    font-size: 26px;
    font-weight: 600;
    color: #000;
  }

  .item-shipping {
    display: flex;
    align-items: center;
    align-items: center;
    span {
      text-transform: uppercase;
      font-size: 16px;
      color: #000;
      padding-left: 20px;
    }
  }
  .content {
    .address {
      margin-bottom: 35px;
      .form_control {
        display: flex;
        justify-content: space-between;
        .control {
          width: 50%;
          margin-bottom: 35px;

          + .control {
            margin-left: 30px;
          }

          .group {
            display: flex;
            input[name="numberphone[prefix]"] {
              max-width: 80px;
              margin-right: 20px;
              cursor: default;
              &:focus {
                border-bottom: 2px solid #eee;
              }
            }
          }
          .message {
            span {
              color: #666;
              font-size: 16px;
              line-height: 1.75;
            }
          }

          label {
            display: block;
            color: #959595;
            font-size: 12px;
            font-weight: 400;
            margin-bottom: 0;
            &::after {
              content: "*";
              color: red;
              font-size: 13px;
              margin: 0 0 0 3px;
            }
          }
          select,
          input {
            width: 100%;
            border: none;
            font-weight: 400;
            border-bottom: 2px solid #eee;
            background-color: #fff;
            color: #000;
            font-size: 16px;
            height: 40px;
            outline: none;

            &:focus {
              border-bottom: 2px solid #000;
            }
          }
        }
      }
    }
    .method {
      .desc {
        margin-bottom: 27px;
        line-height: 1.75;
        color: #666;
      }
    }
  }
  .btn {
    padding: 0;
    margin-top: 20px;
    width: 160px;
    margin-bottom: 20px;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px 0 25px 40px;
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;

    .fee span {
      font-size: 20px;
      font-weight: 400;
    }
  }
`;

export default Shipping;
