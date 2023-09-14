import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { Space, Table } from "antd";
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  apiDestroyCategories,
  apiGetTrashCategories,
  apiRemoveCategories,
  apiRestoreCategories,
} from "../../services/category";
import {
  apiCallFailed,
  apiCallStart,
  apiCallSuccess,
} from "../../providers/stateApiSlice";
import Toast from "../../components/Toast";

const Trash = () => {
  const columns = [
    {
      title: "#",
      dataIndex: "0",
      key: "#",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (name, record) => <Link to={record.slug}>{name}</Link>,
    },
    {
      title: "Loại Sản Phẩm",
      dataIndex: "type",
      key: "type",
      render: (_, record) => record.type.name,
    },
    {
      title: "Thời gian xóa",
      dataIndex: "deletedAt",
      key: "deletedAt",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={record._id} onClick={(e) => handleRestore(e, record._id)}>
            Khôi Phục
          </Link>
          <Link
            className="delete"
            onClick={() => setOpenModal({ state: true, id: record._id })}
          >
            Xóa Vĩnh Viển
          </Link>
        </Space>
      ),
    },
  ];

  const dispatch = useDispatch();
  const stateApi = useSelector((state) => state?.stateApi);
  const [openModal, setOpenModal] = useState({ state: false, id: "" });
  const [list, setList] = useState([]);

  const getList = () => {
    dispatch(apiCallStart());
    apiGetTrashCategories()
      .then((res) => {
        setList(res.data);
        dispatch(apiCallSuccess());
      })
      .catch((err) => dispatch(apiCallFailed()));
  };

  const handleRestore = (e, id) => {
    e.preventDefault();
    dispatch(apiCallStart());
    apiRestoreCategories(id)
      .then((res) => {
        setList(res.data);
        Toast("success", res.message);
        dispatch(apiCallSuccess());
      })
      .catch((err) => dispatch(apiCallFailed()));
  };

  const handleConfirm = () => {
    setOpenModal({ state: false });
    dispatch(apiCallStart());
    apiDestroyCategories(openModal.id)
      .then((res) => {
        setList(res.data);
        Toast("success", res.message);
        dispatch(apiCallSuccess());
      })
      .catch((err) => dispatch(apiCallFailed()));
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <Wrapper>
      <ToastContainer />
      <Loading open={stateApi?.isFetching} />
      <Modal
        detroy
        open={openModal.state}
        onCancel={() => setOpenModal({ state: false, id: "" })}
        handleConfirm={handleConfirm}
      />
      <Top className="mb-3">
        <span>Bộ Sưu Tập Đã Xóa Gần Đây</span>
        <Link to="/dashboard/category">Xem Danh Sách</Link>
      </Top>
      <Table columns={columns} dataSource={list} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .delete {
    color: red;
  }
  a:hover {
    text-decoration: underline;
  }
  img {
    width: 400px;
  }
`;
const Top = styled.div`
  span {
    font-size: 24px;
    display: block;
  }
  a:hover {
    text-decoration: underline;
  }
`;

export default Trash;
