import { Button } from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import { Col, Form, Row } from "react-bootstrap";
import { styled } from "styled-components";

const FormControl = ({
  label,
  onChange,
  select,
  text,
  files,
  data,
  value,
  button,
  handleOpenForm,
  check,
  textarea,
  type,
}) => {
  return (
    <Wrapper>
      <Form.Group as={Row} className="mb-3">
        <Col sm="2">
          <Form.Label>{label}</Form.Label>
        </Col>
        <Col sm="8" as={check && Row}>
          {(select && (
            <Form.Select value={value} onChange={(e) => onChange(e)}>
              <option value="">Vui lòng chọn</option>
              {data?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </Form.Select>
          )) ||
            (check &&
              data?.map((item) => (
                <Col sm="1" key={item._id}>
                  <Form.Check
                    label={item.name}
                    onChange={(e) => onChange(e)}
                    id={item._id}
                    value={item._id}
                  />
                </Col>
              ))) ||
            (textarea && (
              <Form.Control
                as="textarea"
                rows={5}
                onChange={(e) => onChange(e)}
                value={value}
              />
            )) ||
            (files && (
              <Button
                icon={<UploadOutlined />}
                onClick={() => document.getElementById("uploadFile").click()}
              >
                <input
                  accept="image/*"
                  type="file"
                  id="uploadFile"
                  hidden
                  multiple
                  onChange={(e) => onChange(e)}
                />
                <label>Chọn Ảnh</label>
              </Button>
            )) || (
              <Form.Control
                type={type}
                onChange={(e) => onChange(e)}
                value={value}
              />
            )}
        </Col>
        {button && select && (
          <Col sm="2">
            <Button className="btn" onClick={handleOpenForm}>
              <PlusOutlined />
            </Button>
          </Col>
        )}
      </Form.Group>
    </Wrapper>
  );
};
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
  option,
  .form-check-label {
    text-transform: uppercase;
  }
`;

export default FormControl;
