import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { styled } from "styled-components";
import Product from "../components/Product";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Collection = () => {
  const [products, setProducts] = useState([]);
  const { slugCollection } = useParams();
  const productsReducer = useSelector((state) => state?.products?.data);
  useEffect(() => {
    if (
      productsReducer.some(
        (product) => product.collections.slug === slugCollection
      )
    ) {
      setProducts((pre) => [
        ...pre,
        productsReducer?.filter(
          (product) => product.collections.slug === slugCollection
        ),
      ]);
    } else {
      console.log(`no collections ${slugCollection}`);
    }
  }, [slugCollection]);

  console.log(products);
  return (
    <Wrapper>
      <Banner>
        <div
          className="image"
          style={{
            backgroundImage: `url("https://elise.vn/media/wysiwyg/BANNER/cv-shades-of-lace.jpg")`,
          }}
        ></div>
      </Banner>
      <Content>
        <Title>
          <p>
            <span>#SHADESOFLACE</span>
            <span>&nbsp;#ELise</span>
          </p>
          <p>
            <span className="time">September 2023</span>
          </p>
          <p>&nbsp;</p>
        </Title>
        <div className="content">
          <Row>
            <Col sm="6">
              <Product className="item" />
            </Col>
            <Col sm="6">
              <Product />
            </Col>
            <Col sm="12">
              <Product />
            </Col>
            <Col sm="6">
              <Product className="item" />
            </Col>
            <Col sm="6">
              <Product />
            </Col>
          </Row>
        </div>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;
const Banner = styled.div`
  position: relative;
  top: -144px;
  height: calc(100vh - 144px);
  .image {
    height: 100vh;
    position: relative;
    overflow: hidden;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top center;
    &::before {
      content: "";
      background: rgba(0, 0, 0, 0.23);
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 99999;
    }
  }
`;
const Content = styled.div`
  width: 1590px;
  max-width: 100%;
  margin: auto;
  padding: 0 50px;
  .item {
    margin-bottom: 97px;
  }
  .col-sm-12 {
    max-width: 1000px;
    margin: auto;
    margin-bottom: 97px;
  }
`;
const Title = styled.div`
  padding-top: 70px;
  padding-bottom: 70px;
  text-align: center;
  p {
    span {
      text-transform: uppercase;
      font-size: 16px;
      color: #000;
      font-weight: 700;
    }
    .time {
      font-size: 13.33333px;
      font-style: italic;
      text-transform: none;
      font-weight: 300;
      color: #666;
    }
  }
`;

export default Collection;
