import React, { useState } from "react";
import { Button, Image } from "antd";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import Loading from "../../components/Loading";
import { apiStoredType } from "../../services/type";
import {
  apiCallFailed,
  apiCallStart,
  apiCallStored,
} from "../../providers/stateApiSlice";

const Add = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState();
  const stateApi = useSelector((state) => state?.stateApi);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(apiCallStart());
    apiStoredType({ name: value })
      .then((res) => {
        dispatch(apiCallStored(res.message));
        window.location = "/dashboard/type";
      })
      .catch((err) => dispatch(apiCallFailed()));
  };

  return (
    <Wrapper>
      <Loading open={stateApi?.isFetching} />
      <ToastContainer />

      <Form onSubmit={handleSubmit}>
        <Top className="mb-3">
          <span>Thêm Loại Sản Phẩm Mới</span>
        </Top>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Tên Loại Sản Phẩm
          </Form.Label>
          <Col sm="10">
            <Form.Control
              onChange={(e) => setValue(e.target.value)}
              placeholder="Tên bộ sưu tập"
            />
          </Col>
        </Form.Group>

        <Form.Group>
          <Button type="primary" htmlType="submit" className="btn-submit">
            {(stateApi?.isFetching && (
              <Image
                className="loading"
                src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
                alt=""
              />
            )) ||
              "Thêm"}
          </Button>
        </Form.Group>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .preview-img {
    img {
      height: 250px;
    }
  }
  .btn-submit {
    text-align: center;
    .loading {
      width: 20px;
    }
  }
`;
const Top = styled.div`
  span {
    font-size: 24px;
    display: block;
  }
`;
export default Add;
