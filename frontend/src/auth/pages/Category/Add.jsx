import React, { useEffect, useState } from "react";
import { Button, Image } from "antd";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

import Loading from "../../components/Loading";
import { apiStoredCategories } from "../../services/category";
import {
  apiCallFailed,
  apiCallStart,
  apiCallStored,
  apiCallSuccess,
} from "../../providers/stateApiSlice";
import { apiGetType } from "../../services/type";

const Add = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValue] = useState({ name: "", typeId: "" });
  const [types, setTypes] = useState([]);
  const stateApi = useSelector((state) => state?.stateApi);

  const getTypes = () => {
    dispatch(apiCallStart());
    apiGetType()
      .then((res) => {
        setTypes(res.data);
        dispatch(apiCallSuccess());
      })
      .catch((err) => dispatch(apiCallFailed()));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(apiCallSuccess());
    apiStoredCategories(values)
      .then((res) => {
        dispatch(apiCallStored(res.message));
        navigate("/dashboard/category");
      })
      .catch((err) => dispatch(apiCallFailed()));
  };

  useEffect(() => {
    getTypes();
  }, []);

  return (
    <Wrapper>
      <Loading open={stateApi?.isFetching} />
      <ToastContainer />
      <Form onSubmit={handleSubmit}>
        <Top className="mb-3">
          <span>Thêm Danh Mục Sản Phẩm Mới</span>
        </Top>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Tên Danh Mục Sản Phẩm
          </Form.Label>
          <Col sm="10">
            <Form.Control
              onChange={(e) => setValue({ ...values, name: e.target.value })}
              placeholder="Tên bộ sưu tập"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Loại Sản Phẩm
          </Form.Label>
          <Col sm="10">
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setValue({ ...values, typeId: e.target.value })}
            >
              <option>Chọn loại thời trang</option>
              {types.map((type) => (
                <option value={type._id}>{type.name}</option>
              ))}
            </Form.Select>
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
