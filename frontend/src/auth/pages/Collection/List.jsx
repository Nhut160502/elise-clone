import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Image, Space, Table } from "antd";
import { styled } from "styled-components";
import { ToastContainer } from "react-toastify";

import Toast from "../../components/Toast";
import Loading from "../../components/Loading";
import ModalConfirm from "../../components/Modal";
import {
  apiGetCollections,
  apiGetTrashCollections,
  apiRemoveCollection,
} from "../../services/collection";
import {
  apiCallStart,
  apiCallSuccess,
  apiCallFailed,
  apiCallStored,
} from "../../providers/stateApiSlice";
const ListCollection = () => {
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
      render: (url) => <Image className="img" src={url} />,
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
            onClick={() => setOpenModel({ state: true, id: record._id })}
          >
            Xóa
          </Link>
        </Space>
      ),
    },
  ];

  const dispatch = useDispatch();
  const stateApi = useSelector((state) => state?.stateApi);
  const [openModel, setOpenModel] = useState({ state: false, id: "" });
  const [list, setList] = useState({ data: [], trash: 0 });

  const getList = () => {
    dispatch(apiCallStart());
    apiGetCollections()
      .then(async (res) => {
        const trash = await apiGetTrashCollections();
        setList({ data: res.data, trash: trash.data.length });
        dispatch(apiCallSuccess());
      })
      .catch(() => dispatch(apiCallFailed()));
  };

  const handleConfirm = async () => {
    setOpenModel({ state: false });

    dispatch(apiCallStart());

    apiRemoveCollection(openModel.id)
      .then((res) => {
        setList({ data: res.data, trash: list.trash + 1 });
        dispatch(apiCallSuccess());
        Toast("success", res.message);
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
      <ModalConfirm
        open={openModel.state}
        onCancel={() => setOpenModel({ state: false, id: "" })}
        handleConfirm={handleConfirm}
      />
      <Top>
        <span>Danh Sách Bộ Sưu Tập</span>
        <Link to="/dashboard/collection/trash">{`Thùng rác (${list.trash})`}</Link>
      </Top>
      <Table dataSource={list.data} columns={columns} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .img {
    width: 400px;
  }
  a:hover {
    text-decoration: underline;
  }
  .delete {
    color: red;
  }
  td {
    text-transform: uppercase;
  }
`;
const Top = styled.div`
  margin-bottom: 16px;
  span {
    font-size: 24px;
    display: block;
  }
`;

export default ListCollection;
