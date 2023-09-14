import { Button } from "antd";
import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Col, Form, Image, Row } from "react-bootstrap";

import Toast from "../../components/Toast";
import Loading from "../../components/Loading";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  apiCallFailed,
  apiCallStart,
  apiCallSuccess,
} from "../../providers/stateApiSlice";
import { apiGetCollections } from "../../services/collection";
import { apiGetCategories } from "../../services/category";
import {
  apiDestroyImage,
  apiShowProduct,
  apiUpdateProduct,
} from "../../services/product";
import { apiGetColors } from "../../services/color";
import { apiGetDesigns } from "../../services/design";
import { apiGetMaterials } from "../../services/material";
import { apiGetSizes } from "../../services/size";
import FormControl from "../../components/FormControl";
import ButtonSubmit from "../../components/ButtonSubmit";
import PreviewImage from "../../components/PreviewImage";

const Detail = () => {
  const dispatch = useDispatch();
  const stateApi = useSelector((state) => state?.stateApi);
  const [files, setFiles] = useState([]);
  const { slugProduct } = useParams();
  const [collections, setCollections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({});
  const [colors, setColors] = useState([]);
  const [designs, setDesigns] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [lengthImgs, setLengthImgs] = useState();

  const getList = async () => {
    dispatch(apiCallStart());
    try {
      const collections = await apiGetCollections();
      const categories = await apiGetCategories();
      const product = await apiShowProduct(slugProduct);
      const colors = await apiGetColors();
      const designs = await apiGetDesigns();
      const materials = await apiGetMaterials();
      const sizes = await apiGetSizes();

      setCollections(collections.data);
      setCategories(categories.data);
      setProduct(product.data);
      setColors(colors.data);
      setDesigns(designs.data);
      setMaterials(materials.data);
      setSizes(sizes.data);
      setLengthImgs(product.data.imgUrl.length);

      dispatch(apiCallSuccess());
    } catch (error) {
      dispatch(apiCallFailed());
    }
  };

  const handleCheckSize = (e) => {
    product.sizes.some((size, index) => {
      if (size._id === e.target.value) {
        const sizesId = product.sizes.filter(
          (size) => size._id !== e.target.value
        );
        const stock = product.stock.filter(
          (value) => value !== product.stock[index]
        );
        setProduct({ ...product, sizes: sizesId, stock: stock });
      } else {
        setProduct({
          ...product,
          sizes: [
            ...product.sizes,
            { _id: e.target.value, name: e.target.labels[0].innerText },
          ],
          stock: [...product.stock, 0],
        });
      }
    });
  };

  const handleDeleteIamge = (id, index) => {
    dispatch(apiCallStart());
    if (index + 1 > lengthImgs) {
      const imgUrl = product.imgUrl.splice(!index, product.imgUrl.length - 1);
      const fileUpload = files.splice(!index, files.length - 1);
      setProduct({ ...product, imgUrl: imgUrl });
      setFiles(fileUpload);

      dispatch(apiCallSuccess());
      Toast("success", "Delete image successfully");
    } else {
      apiDestroyImage(id, index)
        .then((res) => {
          setProduct({ ...product, imgUrl: res.data });
          Toast("success", res.message);
          dispatch(apiCallSuccess());
        })
        .catch((err) => dispatch(apiCallFailed()));
    }
  };

  const handleChoseFile = (e) => {
    const filesUpload = e.target.files;
    const arrUrls = product.imgUrl;
    const arrFiles = files;

    for (let i = 0; i < filesUpload.length; i++) {
      const file = URL.createObjectURL(filesUpload[i]);
      arrUrls.push(file);
      arrFiles.push(filesUpload[i]);
    }
    setProduct({ ...product, imgUrl: arrUrls });
    setFiles(arrFiles);

    e.target.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(apiCallStart());
    const formData = new FormData();
    formData.append("collectionId", product.collections._id);
    formData.append("categoryId", product.categorires._id);
    formData.append("name", product.name);
    formData.append("colorId", product.colors._id);
    formData.append("designId", product.designs._id);
    formData.append("materialId", product.materials._id);
    files.length > 0 &&
      files?.forEach((file) => {
        console.log(file);
        formData.append("files", file);
      });
    product.sizes.map((size) => formData.append("sizes", size._id));
    product.stock.map((item) => formData.append("stock", item));
    formData.append("price", product.price);
    formData.append("desc", product.desc);
    formData.append("note", product.note);

    apiUpdateProduct(product._id, formData)
      .then(() => (window.location = "/dashboard/product"))
      .catch((err) => dispatch(apiCallFailed()));
  };

  useEffect(() => {
    getList();
  }, [slugProduct]);

  return (
    <Wrapper>
      <Loading open={stateApi?.isFetching} />
      <ToastContainer />
      <Form onSubmit={handleSubmit} enctype="multipart/form-data">
        <Top className="mb-3">
          <span>
            Chi Tiết Sản Phẩm: <i>{product.name}</i>
          </span>
        </Top>

        <FormControl
          select
          label="Bộ Sưu Tập"
          data={collections}
          value={product?.collections?._id}
          onChange={(e) =>
            setProduct({ ...product, collections: { _id: e.target.value } })
          }
        />

        <FormControl
          select
          label="Danh Mục"
          data={categories}
          value={product?.categorires?._id}
          onChange={(e) =>
            setProduct({ ...product, categorires: { _id: e.target.value } })
          }
        />
        <FormControl
          label="Tên Sản Phẩm"
          value={product?.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />

        {(product?.imgUrl?.length > 0 && (
          <Form.Group as={Row} className="mb-3">
            <Col sm="2">
              <Form.Label>Hình Ảnh</Form.Label>
            </Col>
            <Col sm="8" as={Row}>
              {product?.imgUrl.map((url, index) => (
                <Col sm="2">
                  <Image src={url} />
                  <div className="btn-remove-img">
                    <Button
                      icon={<DeleteOutlined />}
                      onClick={() => handleDeleteIamge(product._id, index)}
                    />
                  </div>
                </Col>
              ))}
            </Col>
            <Col sm="2">
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
                  onChange={(e) => handleChoseFile(e)}
                />
                <label>Chọn Thêm Ảnh</label>
              </Button>
            </Col>
          </Form.Group>
        )) || <PreviewImage getFile={(file) => setFiles(file)} />}

        <FormControl
          select
          label="Màu Sắc"
          data={colors}
          value={product?.colors?._id}
          onChange={(e) => setProduct({ ...product, colors: e.target.value })}
        />

        <FormControl
          select
          label="Kiểu Dáng"
          data={designs}
          value={product?.designs?._id}
          onChange={(e) => setProduct({ ...product, designs: e.target.value })}
        />

        <FormControl
          select
          label="Chất Liệu"
          data={materials}
          value={product?.materials?._id}
          onChange={(e) =>
            setProduct({ ...product, materials: e.target.value })
          }
        />

        <Form.Group as={Row} className="mb-3">
          <Col sm="2">
            <Form.Label>Kích Thước</Form.Label>
          </Col>
          <Col sm="8" as={Row}>
            {sizes.map((size) => {
              let checked = false;
              product.sizes.map((item) => {
                if (item._id === size._id) return (checked = true);
              });
              return (
                <Col sm="2">
                  <Form.Check
                    id={size._id}
                    value={size._id}
                    checked={checked}
                    label={size.name}
                    onChange={(e) => handleCheckSize(e)}
                  />
                </Col>
              );
            })}
          </Col>
        </Form.Group>

        {product?.sizes?.map((size, index) => (
          <FormControl
            text
            label={`Số Lượng Sản Phẩm Size ${size.name}`}
            value={product?.stock[index]}
            onChange={(e) => {
              const value = e.target.value;
              const stock = product.stock;
              stock[index] = Number(value);
              setProduct({ ...product, stock: stock });
            }}
          />
        ))}

        <FormControl
          label="Giá Sản Phẩm"
          value={product?.price}
          type="number"
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />

        <FormControl
          textarea
          label="Mô Tả"
          value={product?.desc}
          onChange={(e) => setProduct({ ...product, desc: e.target.value })}
        />

        <FormControl
          textarea
          label="Lưu Ý"
          value={product?.note}
          onChange={(e) => setProduct({ ...product, note: e.target.value })}
        />

        <ButtonSubmit title="Cập Nhật" />
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  img {
    width: 100%;
  }

  .btn-remove-img {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const Top = styled.div`
  span {
    font-size: 24px;
    display: block;
  }
`;

export default Detail;
