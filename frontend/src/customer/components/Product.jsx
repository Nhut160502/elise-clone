import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
const Product = ({ className, size, data }) => {
  const [hover, setHover] = useState(false);
  return (
    <Wrapper className={className}>
      <Image
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Link to={`/p/${data?.slug}.html`}>
          <img src={data?.imgUrl[0]} alt={data?.name} />
          <img
            className={(hover && "hover active") || "hover"}
            src={data?.imgUrl[1]}
            alt={data?.name}
          />
        </Link>
      </Image>
      <InFor>
        <div className="name">
          <Link to={`/p/${data?.slug}.html`}>
            <h5>{data?.name}</h5>
          </Link>
        </div>
        <div className="price">
          <span>{data?.price} VND</span>
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
    text-transform: uppercase;
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
