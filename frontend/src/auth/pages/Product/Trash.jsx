import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { Space, Table } from "antd";
import { Image } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import Toast from "../../components/Toast";
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
import {
  apiDestroyProduct,
  apiGetTrashProducts,
  apiRetoreProduct,
} from "../../services/product";
import {
  apiCallFailed,
  apiCallStart,
  apiCallSuccess,
} from "../../providers/stateApiSlice";

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
      title: "Danh Mục",
      dataIndex: "category",
      key: "category",
      render: (_, record) => record.categorires.name,
    },
    {
      title: "Bộ Sưu Tập",
      dataIndex: "collection",
      key: "collection",
      render: (name, record) => record.collections.name,
    },
    {
      title: "Hình Ảnh",
      dataIndex: "imgUrl",
      key: "imgUrl",
      render: (url) => <Image className="img" src={url[0]} />,
    },
    {
      title: "Thời Gian Xóa",
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
    apiGetTrashProducts()
      .then((res) => {
        setList(res.data);
        dispatch(apiCallSuccess());
      })
      .catch((err) => dispatch(apiCallFailed()));
  };

  const handleRestore = (e, id) => {
    e.preventDefault();
    dispatch(apiCallStart());
    apiRetoreProduct(id)
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
    apiDestroyProduct(openModal.id)
      .then((res) => {
        setList(res.data);
        dispatch(apiCallSuccess());
        Toast("success", res.message);
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
        <span>Sản Phẩm Đã Xóa</span>
        <Link to="/dashboard/product">Xem danh sách</Link>
      </Top>
      <Table columns={columns} dataSource={list} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  td {
    text-transform: uppercase;
  }
  .img {
    width: 150px;
  }
  a:hover {
    text-decoration: underline;
  }
  .delete {
    color: red;
  }
  a {
    color: #000;
    font-size: 16px;
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
