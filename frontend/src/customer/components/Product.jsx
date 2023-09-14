import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
const Product = ({ className, size }) => {
  const [hover, setHover] = useState(false);
  return (
    <Wrapper className={className}>
      <Image
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Link to="/sm-ren-hoa-den-phoi-to-den.html">
          <img
            src="https://elise.vn/media/catalog/product/cache/b35d2052d2e1ce5f6cbaec523842ed65/f/s/fs2305146tllabk3.jpg"
            alt=""
          />
          <img
            src="https://elise.vn/media/catalog/product/cache/f677d7e3a5087b6a18a5b1f320b78594/f/s/fs2305146tllabk.jpg"
            alt=""
            className={(hover && "hover active") || "hover"}
          />
        </Link>
      </Image>
      <InFor>
        <div className="name">
          <Link to="/sm-ren-hoa-den-phoi-to-den">
            <h5>SM REN HOA ĐEN PHỐI TƠ ĐEN</h5>
          </Link>
        </div>
        <div className="price">
          <span>1.198.000 VND</span>
        </div>

        {size && (
          <div className="size">
            <span>L</span>
          </div>
        )}
      </InFor>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 30px;
  padding: 0 15px;
`;
const Image = styled.div`
  position: relative;
  a {
    display: block;
  }
  img {
    width: 100%;
  }
  img.hover {
    position: absolute;
    left: 0;
    opacity: 0;
    top: 0;
    right: 0;
    transition: all 0.2s;
  }
  img.hover.active {
    opacity: 1 !important;
  }
`;
const InFor = styled.div`
  padding-top: 12px;
  .name {
    margin-bottom: 6px;
    line-height: 1.1;
    a {
      display: inline-block;
      transition: all 0.2s;
      color: #000;
      &:hover {
        color: #a68242;
      }
    }
    h5 {
      font-size: 16px !important;
    }
  }
  .price {
    font-size: 16px;
    color: #000;
  }
  .size {
    span {
      color: #000;
      font-size: 16px;
      font-weight: 600;
    }
  }
`;

export default Product;
