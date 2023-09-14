import React, { useEffect, useRef, useState } from "react";
import { Button, Image } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { styled } from "styled-components";
import { apiStoredCollection } from "../../services/collection";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import Loading from "../../components/Loading";
import {
  apiCallFailed,
  apiCallStart,
  apiCallStored,
} from "../../providers/stateApiSlice";

const Add = () => {
  const dispatch = useDispatch();
  const inputFile = useRef(null);
  const [value, setValue] = useState();
  const [fileName, setFileName] = useState({
    name: "",
    file: "",
  });

  const stateApi = useSelector((state) => state?.stateApi);
  const handleChoseImage = () => {
    document.getElementById("uploadFile").click();
  };

  const handleUpload = (e) => {
    if (e.target.files[0]) {
      setFileName({
        name: e.target.files[0],
        file: URL.createObjectURL(e.target.files[0]),
      });
    }
    e.target.value = "";
  };

  const handleDeleteFile = () => {
    setFileName({ name: "", file: "" });
  };

  //   cleanup function
  useEffect(() => {
    return () => {
      fileName.file && URL.revokeObjectURL(fileName.file);
    };
  }, [fileName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(apiCallStart());

    let formData = new FormData();
    formData.append("file", fileName.name);
    formData.append("name", value);

    apiStoredCollection(formData)
      .then((res) => {
        dispatch(apiCallStored(res.message));
        window.location = "/dashboard/collection";
      })
      .catch(() => dispatch(apiCallFailed()));
  };

  return (
    <Wrapper>
      <Loading open={stateApi?.isFetching} />
      <ToastContainer />

      <Form onSubmit={handleSubmit}>
        <Top className="mb-3">
          <span>Thêm Bộ Sưu Tập Mới</span>
        </Top>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Tên Bộ Sưu Tập
          </Form.Label>
          <Col sm="10">
            <Form.Control
              onChange={(e) => setValue(e.target.value)}
              placeholder="Tên bộ sưu tập"
            />
          </Col>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label column sm="2">
            Hình Ảnh
          </Form.Label>
          <Button icon={<UploadOutlined />} onClick={handleChoseImage}>
            <input
              type="file"
              id="uploadFile"
              hidden
              ref={inputFile}
              onChange={handleUpload}
            />
            <label>Chọn Ảnh</label>
          </Button>
        </Form.Group>
        {fileName.name && (
          <>
            <div className="list-img-name mb-3">
              <span>{fileName.name.name}</span>
              <DeleteOutlined onClick={handleDeleteFile} />
            </div>
            <div className="preview-img mb-3">
              <img src={fileName.file} alt="" />
            </div>
          </>
        )}
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

export default Add;

const Wrapper = styled.div`
  .list-img-name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ff4d4f;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
  }
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
