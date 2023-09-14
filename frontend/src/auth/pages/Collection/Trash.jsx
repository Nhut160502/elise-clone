import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { Space, Table } from "antd";
import { Image } from "react-bootstrap";
import Modal from "../../components/Modal";
import {
  apiDestroyCollection,
  apiGetTrashCollections,
  apiRestoreCollection,
} from "../../services/collection";
import Loading from "../../components/Loading";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
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
      title: "Hình Ảnh",
      dataIndex: "imgUrl",
      key: "imgUrl",
      render: (url) => <Image src={url} />,
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
            Khôi phục
          </Link>
          <Link
            className="delete"
            onClick={() => setOpenModal({ state: true, id: record._id })}
          >
            Xóa vĩnh viển
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
    apiGetTrashCollections()
      .then((res) => {
        setList(res.data);
        dispatch(apiCallSuccess());
      })
      .catch((err) => dispatch(apiCallFailed()));
  };

  const handleRestore = (e, id) => {
    e.preventDefault();
    dispatch(apiCallStart());
    apiRestoreCollection(id)
      .then((res) => {
        setList(res.data);
        dispatch(apiCallSuccess());
        Toast("success", res.message);
      })
      .catch((err) => dispatch(apiCallFailed()));
  };

  const handleConfirm = () => {
    setOpenModal({ state: false });

    dispatch(apiCallStart());

    apiDestroyCollection(openModal.id)
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
      <Top>
        <span>Bộ Sưu Tập Đã Xóa</span>
        <Link to="/dashboard/collection">Xem danh sách</Link>
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
  margin-bottom: 16px;
  span {
    font-size: 24px;
    display: block;
  }
  a:hover {
    text-decoration: underline;
  }
`;

export default Trash;
