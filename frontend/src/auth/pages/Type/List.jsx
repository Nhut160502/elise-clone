import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { Space, Table } from "antd";
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  apiGetTrashType,
  apiGetType,
  apiRemoveType,
} from "../../services/type";
import {
  apiCallFailed,
  apiCallStart,
  apiCallStored,
  apiCallSuccess,
} from "../../providers/stateApiSlice";
import Toast from "../../components/Toast";

const List = () => {
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

  const getList = async () => {
    dispatch(apiCallStart());
    apiGetType()
      .then(async (res) => {
        const trash = await apiGetTrashType();
        setList({ data: res.data, trash: trash.data.length });
        dispatch(apiCallSuccess());
      })
      .catch((err) => dispatch(apiCallFailed()));
  };

  const handleConfirm = () => {
    setOpenModal({ state: false });
    dispatch(apiCallStart());

    apiRemoveType(openModal.id)
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
        <span>Danh Sách Loai Sản Phẩm</span>
        <Link to="/dashboard/type/trash">Thùng rác ({list.trash})</Link>
      </Top>
      <Table columns={columns} dataSource={list.data} />
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

export default List;
