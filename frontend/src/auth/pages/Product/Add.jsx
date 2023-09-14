import React, { memo, useEffect, useState } from "react";
import { styled } from "styled-components";
import { apiGetCollections } from "../../services/collection";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Form, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { PlusOutlined, CloseOutlined, UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";

import { apiGetType } from "../../services/type";
import { apiStoredProduct } from "../../services/product";
import { apiGetColors, apiStoreColor } from "../../services/color";
import { apiGetSizes, apiStoreSize } from "../../services/size";
import { apiGetDesigns, apiStoreDesign } from "../../services/design";
import { apiGetMaterials, apiStoreMaterial } from "../../services/material";
import Toast from "../../components/Toast";
import Loading from "../../components/Loading";
import ButtonSubmit from "../../components/ButtonSubmit";
import PreviewImage from "../../components/PreviewImage";
import { apiGetCategories, apiStoredCategories } from "../../services/category";
import {
  apiCallFailed,
  apiCallStart,
  apiCallStored,
  apiCallSuccess,
} from "../../providers/stateApiSlice";
import FormControl from "../../components/FormControl";

const Add = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    collectionId: "",
    categoryId: "",
    colorId: "",
    files: [],
    designId: "",
    sizeId: [],
    price: 0,
    materialId: "",
    name: "",
    desc: "",
    note: "",
  });
  const stateApi = useSelector((state) => state?.stateApi);
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [materials, setMaterails] = useState([]);
  const [designs, setDesigns] = useState([]);
  const [openForm, setOpneForm] = useState({
    state: false,
    top: "-100 %",
  });
  const [valuesAdd, setValuesAdd] = useState({
    name: "",
    file: "",
    typeId: "",
  });
  const [contentForm, setContentForm] = useState({
    title: "",
    type: "",
    img: false,
  });

  const getList = async () => {
    dispatch(apiCallStart());

    apiGetType()
      .then((res) => {
        setTypes(res.data);
        dispatch(apiCallSuccess());
      })
      .catch((err) => dispatch(apiCallFailed()));

    apiGetCategories()
      .then((res) => {
        setCategories(res.data);
        dispatch(apiCallSuccess());
      })
      .catch((err) => dispatch(apiCallFailed()));

    apiGetCollections()
      .then((res) => {
        setCollections(res.data);
        dispatch(apiCallSuccess());
      })
      .catch((err) => dispatch(apiCallFailed()));

    apiGetColors()
      .then((res) => {
        setColors(res.data);
        dispatch(apiCallSuccess());
      })
      .catch((err) => dispatch(apiCallFailed()));

    apiGetSizes()
      .then((res) => {
        setSizes(res.data);
        dispatch(apiCallSuccess());
      })
      .catch((err) => dispatch(apiCallFailed()));

    apiGetDesigns()
      .then((res) => {
        setDesigns(res.data);
        dispatch(apiCallSuccess());
      })
      .catch((err) => dispatch(apiCallFailed()));

    apiGetMaterials()
      .then((res) => {
        setMaterails(res.data);
        dispatch(apiCallSuccess());
      })
      .catch((err) => dispatch(apiCallFailed()));
  };

  // get list
  useEffect(() => {
    getList();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(apiCallStart());
    let formData = new FormData();
    values.files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("collectionId", values.collectionId);
    formData.append("categoryId", values.categoryId);
    formData.append("name", values.name);
    formData.append("desc", values.desc);
    formData.append("note", values.note);
    formData.append("colorId", values.colorId);
    formData.append("designId", values.designId);
    formData.append("materialId", values.materialId);
    formData.append("price", values.price);
    values.sizeId.forEach((size) => {
      formData.append("sizeId", size.id);
      formData.append("stock", size.stock);
    });

    apiStoredProduct(formData)
      .then((res) => {
        apiCallStored(res.message);
        window.location = "/dashboard/product";
      })
      .catch((err) => {
        dispatch(apiCallFailed());
      });
  };

  const formStore = async () => {
    dispatch(apiCallStart());
    let res = null;
    try {
      switch (contentForm.type) {
        case "color":
          res = await apiStoreColor({ name: valuesAdd.name });
          setColors((pre) => [...pre, res.data]);
          setValues({ ...values, colorId: res.data._id });
          break;
        case "design":
          res = await apiStoreDesign({ name: valuesAdd.name });
          setDesigns((pre) => [...pre, res.data]);
          setValues({ ...values, designId: res.data._id });
          break;
        case "size":
          res = await apiStoreSize({ name: valuesAdd.name });
          setSizes((pre) => [...pre, res.data]);
          break;
        case "material":
          res = await apiStoreMaterial({ name: valuesAdd.name });
          setMaterails((pre) => [...pre, res.data]);
          setValues({ ...values, materialId: res.data._id });
          break;
        case "category":
          res = await apiStoredCategories({
            name: valuesAdd.name,
            typeId: valuesAdd.typeId,
          });
          setCategories((pre) => [...pre, res.data]);
          setValues({ ...values, categoryId: res.data._id });
          document.body.style.overflowY = null;
          break;
        default:
          break;
      }
      setValuesAdd({ name: "", file: "", typeId: "" });
      setContentForm({ title: "", type: "", img: false });
      document.body.style.overflowY = null;
      setOpneForm({ state: false, top: "-100%" });
      dispatch(apiCallSuccess());
      Toast("success", res.message);
    } catch (error) {
      dispatch(apiCallFailed());
    }
  };

  const handleClickAddMore = (title, type) => {
    setOpneForm({ top: window.scrollY + "px" });
    document.body.style.overflowY = "hidden";
    setContentForm({
      title: title,
      type: type,
    });
  };

  const handleCheckSize = (e) => {
    if (!values.sizeId.some((size) => size.id === e.target.value)) {
      setValues({
        ...values,
        sizeId: [
          ...values.sizeId,
          {
            name: e.target.labels[0].innerText,
            id: e.target.value,
            stock: 0,
          },
        ],
      });
    } else {
      const sizeId = values.sizeId.filter(
        (value) => value.id !== e.target.value
      );
      setValues({ ...values, sizeId: sizeId });
    }
  };

  const handleSubmitFormAdd = async (e) => {
    e.preventDefault();
    formStore();
  };

  values.files.map((file) => console.log(file));

  return (
    <Wrapper>
      <Loading open={stateApi?.isFetching} />
      <ToastContainer />
      <Form onSubmit={handleSubmit} enctype="multipart/form-data">
        <Top className="mb-3">
          <span>Thêm Sản Phẩm Mới</span>
        </Top>

        <FormControl
          select
          value={values.collectionId}
          data={collections}
          label="Chọn Bộ Sưu Tập"
          onChange={(e) =>
            setValues({ ...values, collectionId: e.target.value })
          }
        />

        <FormControl
          select
          button
          data={categories}
          label="Chọn Danh Mục"
          value={values.collectionId}
          handleOpenForm={() => handleClickAddMore("Danh Mục", "category")}
          onChange={(e) => setValues({ ...values, categoryId: e.target.value })}
        />

        <FormControl
          label="Tên Sản Phẩm"
          onChange={(e) => setValues({ ...values, name: e.target.value })}
        />

        <PreviewImage
          getFile={(file) =>
            setValues({ ...values, files: [...values.files, file] })
          }
        />

        <FormControl
          select
          button
          data={colors}
          label="Chọn Màu"
          value={values.colorId}
          handleOpenForm={() => handleClickAddMore("Màu Sắc", "color")}
          onChange={(e) => setValues({ ...values, colorId: e.target.value })}
        />

        <FormControl
          select
          button
          data={designs}
          value={values.designId}
          label="Chọn Kiểu Dáng"
          handleOpenForm={() => handleClickAddMore("Kiểu Dáng", "design")}
          onChange={(e) => setValues({ ...values, designId: e.target.value })}
        />

        <FormControl
          select
          button
          data={materials}
          label="Chọn Chất Liệu"
          value={values.materialId}
          handleOpenForm={() => handleClickAddMore("Chất Liệu", "material")}
          onChange={(e) => setValues({ ...values, materialId: e.target.value })}
        />

        <FormControl
          check
          button
          data={sizes}
          label="Chọn Kích Thước"
          onChange={(e) => handleCheckSize(e)}
          handleOpenForm={() => handleClickAddMore("Kích Thước", "size")}
        />

        {values.sizeId.map((size, index) => (
          <FormControl
            text
            label={`Số Lượng Sản Phẩm Size ${size.name}`}
            onChange={(e) => {
              let sizeId = values.sizeId;
              sizeId[index].stock = Number(e.target.value);
              setValues({ ...values, sizeId: sizeId });
            }}
          />
        ))}

        <FormControl
          type="number"
          label="Giá Sản Phẩm"
          onChange={(e) => setValues({ ...values, price: e.target.value })}
        />

        <FormControl
          label="Mô Tả"
          textarea
          onChange={(e) => setValues({ ...values, desc: e.target.value })}
        />

        <FormControl
          label="Lưu Ý"
          textarea
          onChange={(e) => setValues({ ...values, note: e.target.value })}
        />

        <ButtonSubmit title="Thêm" />
      </Form>

      <FormAdd
        style={{ top: `${openForm.top}` }}
        onSubmit={handleSubmitFormAdd}
      >
        <div className="content">
          <Top className="mb-3">
            <span>{`Thêm ${contentForm.title} Mới`}</span>
          </Top>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Col sm="2">
                <Form.Label>{`Tên ${contentForm.title}`}</Form.Label>
              </Col>
              <Col sm="10">
                <Form.Control
                  onChange={(e) =>
                    setValuesAdd({ ...valuesAdd, name: e.target.value })
                  }
                />
              </Col>
            </Form.Group>

            {contentForm.type === "category" && (
              <Form.Group as={Row} className="mb-3">
                <Col sm="2">
                  <Form.Label>Loại Sản Phẩm</Form.Label>
                </Col>
                <Col sm="10">
                  <Form.Select
                    onChange={(e) =>
                      setValuesAdd({ ...valuesAdd, typeId: e.target.value })
                    }
                  >
                    <option>Chọn lại sản phẩm</option>
                    {types.map((type) => (
                      <option value={type._id}>{type.name}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
            )}
            <ButtonSubmit title="Thêm" />
          </Form>
          <Button
            className="btn btn-coloe"
            onClick={() => {
              document.body.style.overflowY = null;
              setOpneForm({ state: false, top: "-100%" });
            }}
          >
            <CloseOutlined />
          </Button>
        </div>
      </FormAdd>
    </Wrapper>
  );
};

export default memo(Add);

const Wrapper = styled.div`
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .stock {
    max-height: 0;
    transition: all 0.4s;
    overflow-y: hidden;
  }
`;

const Top = styled.div`
  span {
    font-size: 24px;
    display: block;
  }
`;

const FormAdd = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: -100%;
  left: 0;
  bottom: 0;
  right: 0;
  transition: all 0.4s;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    width: 900px;
    background-color: #fff;
    padding: 80px 40px;
    position: relative;
  }
  .btn-coloe {
    position: absolute;
    top: 0;
    right: 0;
    margin: 10px;
  }
  &.active {
    top: 0;
  }
`;
