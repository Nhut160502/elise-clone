import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { DeleteOutlined } from "@ant-design/icons";
import { styled } from "styled-components";
import FormControl from "./FormControl";

const PreviewImage = ({ getFile }) => {
  const [files, setFiles] = useState([]);
  const [arr, setArr] = useState([]);

  const handleUpload = (e) => {
    setFiles([]);
    const filesUpload = e.target.files;
    for (let i = 0; i < filesUpload.length; i++) {
      const file = filesUpload[i];
      setFiles((pre) => [
        ...pre,
        { file: file, url: URL.createObjectURL(file) },
      ]);
      setArr((pre) => [...pre, file]);
    }
    getFile && getFile(arr);
    e.target.value = "";
  };

  // delete preview img
  const handleDeleteFile = (url, index) => {
    setFiles(files.filter((item) => item.url !== url));
    setArr(arr.splice(!index, arr.length - 1));
  };

  //   cleanup url img
  useEffect(() => {
    getFile(arr);
    return () => {
      if (files.length > 0) {
        files.forEach((file) => {
          URL.revokeObjectURL(file.url);
        });
      }
    };
  }, [files]);

  return (
    <Wrapper>
      <FormControl label="Chọn Ảnh" files onChange={handleUpload} />
      <Row>
        <Col sm="2"></Col>
        <Col sm="10">
          {files?.map((file, index) => (
            <div key={file.url} className="list-img-name mb-3">
              <span>{file.file.name}</span>
              <DeleteOutlined
                onClick={() => {
                  handleDeleteFile(file.url, index);
                }}
              />
            </div>
          ))}
          <Row className={files.length > 0 && "mb-3"}>
            {files?.map((file) => (
              <Col key={file?.url} sm="2">
                <img src={file?.url} alt="" />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  img {
    width: 100%;
  }
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
`;

export default PreviewImage;
