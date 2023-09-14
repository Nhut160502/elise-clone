import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import ModalConfirm from "../../components/Modal";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Image, Space, Table } from "antd";
import { styled } from "styled-components";
import { ToastContainer } from "react-toastify";
import Toast from "../../components/Toast";
import {
  apiGetProducts,
  apiGetTrashProducts,
  apiRemoveProduct,
} from "../../services/product";
import {
  apiCallFailed,
  apiCallStart,
  apiCallStored,
  apiCallSuccess,
} from "../../providers/stateApiSlice";

const ListProduct = () => {
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
      dataIndex: "collections",
      key: "collections",
      render: (collections) => <span>{collections.name}</span>,
    },

    {
      title: "Hình Ảnh",
      dataIndex: "imgUrl",
      key: "imgUrl",
      render: (url) => <Image className="img" src={url[0]} />,
    },
    {
      title: "Màu Sắc",
      dataIndex: "colors",
      key: "colors",
      render: (color) => <span>{color?.name}</span>,
    },
    {
      title: "Chất Liệu",
      dataIndex: "materials",
      key: "materials",
      render: (materials) => <span>{materials?.name}</span>,
    },
    {
      title: "Kiểu Dáng",
      dataIndex: "designs",
      key: "designs",
      render: (designs) => <span>{designs?.name}</span>,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
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
    apiGetProducts()
      .then(async (res) => {
        const trash = await apiGetTrashProducts();
        setList({ data: res.data, trash: trash.data.length });
        dispatch(apiCallSuccess());
      })
      .catch((err) => dispatch(apiCallFailed()));
  };
  const handleConfirm = async () => {
    setOpenModel({ state: false });
    dispatch(apiCallStart());
    apiRemoveProduct(openModel.id)
      .then((res) => {
        setList({ data: res.data, trash: list.trash + 1 });
        dispatch(apiCallSuccess());
        Toast("success", res.message);
      })
      .catch((err) => dispatch(apiCallFailed()));
  };

  useEffect(() => {
    getList();
    if (stateApi.message) {
      Toast("success", stateApi.message);
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
        <Link to="/dashboard/product/trash">{`Thùng rác (${list.trash})`}</Link>
      </Top>
      <Table
        dataSource={list.data}
        columns={columns}
        pagination={{
          defaultCurrent: 1,
          defaultPageSize: 5,
          position: ["bottomCenter"],
        }}
      />
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
`;

export default ListProduct;
