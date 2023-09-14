import { Col, Row } from "react-bootstrap";
import { styled } from "styled-components";
import Product from "../components/Product";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

function Category() {
  const [sticky, setSticky] = useState(false);
  const categories = useSelector((state) => state?.categories?.data);
  const { slugType } = useParams();
  const { slugCategory } = useParams();
  const handleScroll = (event) => {
    if (event.currentTarget.scrollY > 0) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {}, []);

  return (
    <Wrapper>
      <Topbar className={sticky && "sticky"}>
        <div className="tobar">
          <ul>
            <li>
              <Link
                to="/thoi-trang-nu.html"
                className={!slugCategory && "active"}
              >
                Xem Tất cả
              </Link>
            </li>
            {categories.map((category) => {
              if (category.type.slug === slugType) {
                return (
                  <li>
                    <Link
                      to={`/${slugType}/${category.slug}.html`}
                      className={slugCategory === category.slug && "active"}
                    >
                      {category.name}
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </Topbar>
      <Content>
        <Row>
          <Col sm="4">
            <Product />
          </Col>
          <Col sm="4">
            <Product />
          </Col>
          <Col sm="4">
            <Product />
          </Col>
          <Col sm="4">
            <Product />
          </Col>
          <Col sm="4">
            <Product />
          </Col>
          <Col sm="4">
            <Product />
          </Col>
        </Row>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 70px;
`;
const Topbar = styled.div`
  padding: 10px 0 30px;
  width: 100%;
  background-color: #fff;
  transition: all 0.4s ease;
  position: fixed;
  top: 144px;
  z-index: 1;
  &.sticky {
    top: 88px;
  }
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    li {
      a {
        margin: 0 12px;
        font-size: 12px;
        color: #000;
        text-transform: uppercase;
      }
      .active {
        text-decoration: underline;
      }
    }
  }
`;
const Content = styled.div``;

export default Category;
