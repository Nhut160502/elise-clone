import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { Space, Table } from "antd";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
import Toast from "../../components/Toast";
import {
  apiGetCategories,
  apiGetTrashCategories,
  apiRemoveCategories,
} from "../../services/category";
import {
  apiCallStart,
  apiCallSuccess,
  apiCallFailed,
  apiCallStored,
} from "../../providers/stateApiSlice";

let i = 0;
const ListCategory = () => {
  const columns = [
    {
      title: "#",
      dataIndex: "0",
      key: "#",
      render: () => i++,
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
      title: "Ngày Thêm",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={record._id}>Sửa</Link>
          <Link
            className="delete"
            onClick={() => setOpenModal({ state: true, id: record._id })}
          >
            Xóa
          </Link>
        </Space>
      ),
    },
  ];

  const dispatch = useDispatch();
  const stateApi = useSelector((state) => state?.stateApi);
  const [openModal, setOpenModal] = useState({ state: false, id: "" });
  const [list, setList] = useState({ data: [], trash: 0 });

  const getList = () => {
    dispatch(apiCallStart());
    apiGetCategories()
      .then(async (res) => {
        const trash = await apiGetTrashCategories();
        setList({ data: res.data, trash: trash.data.length });
        dispatch(apiCallSuccess());
      })
      .catch((res) => dispatch(apiCallFailed()));
  };

  const handleConfirm = () => {
    setOpenModal({ state: false });
    apiRemoveCategories(openModal.id)
      .then((res) => {
        setList({ data: res.data, trash: list.trash + 1 });
        Toast("success", res.message);
        dispatch(apiCallSuccess());
      })
      .catch((err) => dispatch(apiCallFailed()));
  };

  useEffect(() => {
    getList();
    if (stateApi?.message) {
      Toast("success", stateApi?.message);
      dispatch(apiCallStored(null));
    }
  }, []);

  return (
    <Wrapper>
      <ToastContainer />
      <Loading open={stateApi?.isFetching} />
      <Modal
        open={openModal.state}
        onCancel={() => setOpenModal({ state: false, id: "" })}
        handleConfirm={handleConfirm}
      />
      <Top className="mb-3">
        <span>Danh Sách Danh Mục Sản Phẩm</span>
        <Link to="/dashboard/category/trash">{`Thùng rác (${list.trash})`}</Link>
      </Top>
      <Table
        pagination={{
          defaultCurrent: 1,
          defaultPageSize: 10,
          position: ["bottomCenter"],
        }}
        columns={columns}
        dataSource={list.data}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  td {
    text-transform: uppercase;
  }
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

export default ListCategory;
