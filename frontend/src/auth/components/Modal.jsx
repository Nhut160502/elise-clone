import React from "react";
import { WarningOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { styled } from "styled-components";
const ModalConfirm = ({ open, loading, onCancel, handleConfirm, detroy }) => {
  let title = "Bạn muốn xóa dử liệu này?";
  if (detroy) {
    title =
      "Bạn muốn xóa dử liệu này khỏi hệ thống?. Hành động này sẽ xóa vĩnh viển dử liệu và không thể khôi phục!";
  }
  return (
    <Wrapper>
      <Modal
        open={open}
        title={
          <Title>
            <WarningOutlined /> <p>Warning</p>
          </Title>
        }
        onOk={handleConfirm}
        onCancel={oncancel}
        footer={[
          <Button
            style={{ backgroundColor: "#dc3545" }}
            className="btn-delete"
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleConfirm}
          >
            Xóa
          </Button>,
          <Button className="btn-cancel" key="back" onClick={onCancel}>
            Hủy
          </Button>,
        ]}
      >
        <p>{title}</p>
      </Modal>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .btn-delete {
    color: #dc3545 !important;
  }
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  color: #ffc107;
  svg {
    font-size: 24px;
  }
  p {
    font-size: 24px;
    margin-left: 4px;
    margin-bottom: 0;
  }
`;

export default ModalConfirm;
