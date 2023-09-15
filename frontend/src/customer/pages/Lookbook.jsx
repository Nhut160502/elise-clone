import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { styled } from "styled-components";
import { getCollections } from "../services/customer";
import { Link } from "react-router-dom";

function Lookbook() {
  const [collections, setCollections] = useState([]);
  useEffect(() => {
    getCollections().then((res) => {
      setCollections(res.data);
    });
  }, []);

  return (
    <Wrapper>
      {collections?.map((collection) => (
        <Item key={collection._id}>
          <Row>
            <Col sm="8" className="left">
              <Link to={`/lookbook/${collection.slug}`}>
                <img src={collection.imgUrl} />
              </Link>
            </Col>
            <Col sm="4" className="right">
              <div className="infor">
                <h1>{collection.name}</h1>
                <p className="brand">ELISE</p>
                <p>September 2023</p>
              </div>
            </Col>
          </Row>
        </Item>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div``;
const Item = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  width: 100%;
  max-width: 1810px;
  margin: 0 auto 50px auto;
  a {
    display: block;
    img {
      width: 100%;
    }
  }
  h1 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 0;
  }
  .left {
    padding-left: 1cm;
  }
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    .brand {
      text-transform: uppercase;
      font-size: 18px;
      margin: 10px 0;
    }
  }
`;
export default Lookbook;
