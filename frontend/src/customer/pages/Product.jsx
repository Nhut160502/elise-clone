import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { styled } from "styled-components";
import Quantity from "../components/Quantity";
import Button from "../components/Button";
import { RightOutlined, CloseOutlined } from "@ant-design/icons";
import Overlay from "../components/Overlay";
import { useDispatch } from "react-redux";
import { closeCart } from "../providers/cartSlice";
import { getProduct } from "../services/customer";
import { useParams } from "react-router-dom";
function Product() {
  const dispatch = useDispatch();
  const { slugProduct } = useParams();
  const [product, setProduct] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [guide, setGuide] = useState({ type: "" });
  const [sizeActive, setSizeActive] = useState("");

  const handleCloseGuide = () => {
    setGuide({ type: "", scroll: "" });
    document.body.style.overflowY = null;
  };

  const hanleAddCart = (e) => {
    e.preventDefault();
    setTimeout(() => {
      dispatch(closeCart());
    }, 3000);
  };

  useEffect(() => {
    getProduct(slugProduct)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Wrapper>
      <Row>
        <Col sm="6" className="left">
          <div className="image">
            {product?.imgUrl?.map((img) => (
              <div className="item">
                <img src={img} alt={product?.name} />
              </div>
            ))}
          </div>
        </Col>
        <Col sm="6" className="right">
          <div className="sticky">
            <div className="name">
              <h1>{product?.name}</h1>
            </div>
            <div className="price">
              <span>{product?.price} VND</span>
            </div>
            <div className="attribute">
              <div
                className={
                  visibility ? "description visibility" : "description"
                }
              >
                <div
                  className={visibility ? "top visibility" : "top"}
                  onClick={() => visibility && setVisibility(false)}
                >
                  Chi Tiết
                </div>
                <p>
                  {product?.desc}
                  <br />
                  Dòng hàng: {product?.categorires?.name}
                  <br />
                  Chất liệu: {product?.materials?.name}
                  <br />
                  Màu sắc: {product?.colors?.name}
                  <br />
                  Kiểu dáng: {product?.designs?.name}
                  <br />
                  Giặt và bảo quản: {product?.note}
                </p>
              </div>
              <div
                className={
                  visibility
                    ? "description-bottom visibility"
                    : "description-bottom "
                }
                onClick={() => setVisibility(true)}
              >
                Xem Thêm
              </div>
            </div>
            <div className="product-add-form">
              <form action="">
                <div className="sizes item-form">
                  <div className="label">
                    <span>Kích Thước</span>
                  </div>
                  <div className="control">
                    {product?.sizes?.map((size) => (
                      <div
                        className={
                          size._id === sizeActive
                            ? "item-control active"
                            : "item-control"
                        }
                        id={size._id}
                        onClick={() =>
                          sizeActive === size._id
                            ? setSizeActive("")
                            : setSizeActive(size._id)
                        }
                      >
                        {size.name}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="quantity item-form">
                  <div className="label">
                    <span>Số Lượng</span>
                  </div>
                  <Quantity defaultVal />
                </div>
                <div className="btn">
                  <Button black onClick={hanleAddCart}>
                    Thêm vào giỏ
                  </Button>
                  <Button>Thêm vào yêu thích</Button>
                  <Button>Mua ngay với</Button>
                </div>
              </form>
            </div>
            <div className="extra-link">
              <div
                className="item"
                onClick={() => {
                  setGuide({ type: "buyding" });
                  document.body.style.overflowY = "hidden";
                }}
              >
                <RightOutlined />
                Hướng Dẩn Mua Hàng
              </div>
              <div
                className="item"
                onClick={() => {
                  setGuide({ type: "sizes" });
                  document.body.style.overflowY = "hidden";
                }}
              >
                <RightOutlined />
                Hướng Dẩn Chọn Kích Cở
              </div>
              <div className="item">
                <RightOutlined />
                Chia sẽ
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Guide
        className={guide.type === "buyding" && "active"}
        onClick={handleCloseGuide}
      >
        <div className="wrapper">
          <h4 class="heading">
            <span>Hướng dẫn mua hàng</span>
            <button className="btn-close-guide" onClick={handleCloseGuide}>
              <CloseOutlined />
            </button>
          </h4>
          <div class="content">
            <p>
              <span>
                <strong>BƯỚC 1: TÌM KIẾM VÀ LỰA CHỌN SẢN PHẨM YÊU THÍCH</strong>
              </span>
            </p>
            <p>
              <img src="https://elise.vn/media/wysiwyg/B_c_1.jpg" alt="" />
            </p>
            <p>- Quý khách có thể tìm kiếm sản phẩm theo 2 cách:</p>
            <p>
              <strong>
                Cách 1: Nhập tên hoặc mã sản phẩm vào thanh công cụ tìm kiếm
              </strong>
            </p>
            <p>
              <strong>
                Cách 2: Tìm theo danh mục sản phẩm trên thanh menu (Online
                Exclusive; BST mới – Bao gồm các sản phẩm đầm, áo, chân váy...)
              </strong>
            </p>
            <p>
              - Sau khi tìm kiếm và lựa chọn được sản phẩm yêu thích, Quý khách
              vui lòng chọn kích cỡ và số lượng sản phẩm muốn mua và chọn mua
              bằng cách bấm chuột vào nút "THÊM VÀO GIỎ".
            </p>
            <p>
              - Khi đã lựa chọn được đủ các sản phẩm cần mua, khách hàng click
              vào icon giỏ hàng trên góc phải màn hình. Quý khách có thể chọn
              thêm/bớt số lượng sản phẩm tại đây và chọn "THANH TOÁN" để tiến
              hành đặt hàng online.
            </p>
            <p>&nbsp;</p>
            <p>
              <span>
                <strong>BƯỚC 2: THANH TOÁN ĐƠN HÀNG</strong>
              </span>
            </p>
            <p>
              <img src="https://elise.vn/media/wysiwyg/B_c_2.0.jpg" alt="" />
            </p>
            <p>
              Trên trang thanh toán, khách hàng đăng nhập/tạo tài khoản theo
              hướng dẫn hoặc điền địa chỉ email trước khi chuyển sang bước tiếp
              theo
            </p>
            <p>
              <strong>1.Phương thức vận chuyển &amp; địa chỉ giao hàng</strong>
            </p>
            <p>- Giao hàng tại Hà Nội hoặc các tỉnh thành khác</p>
            <p>
              - Phí vận chuyển dựa trên trọng lượng kiện hàng và địa điểm giao
              hàng
            </p>
            <p>
              - Quý khách hàng vui lòng điền đúng, đủ thông tin để Elise có thể
              giao hàng đến đúng thông tin quý khách đã đăng ký.
            </p>
            <p>
              <img src="https://elise.vn/media/wysiwyg/B_c_2.1.jpg" alt="" />
            </p>
            <p>
              <strong>2.Phương thức thanh toán</strong>
            </p>
            <p>
              - Khách hàng có thể lựa chọn 1 trong 3 phương thức thanh toán có
              sẵn: (1) Cổng thanh toán VNPAY; (2) Chuyển khoản; (3) Thanh toán
              khi nhận hàng – COD.
            </p>
            <p>
              <img src="https://elise.vn/media/wysiwyg/B_c_2.3.jpg" alt="" />
            </p>
            <p>
              <span>
                <strong>BƯỚC 3: XÁC NHẬN ĐƠN HÀNG</strong>
              </span>
            </p>
            <p>
              <img src="https://elise.vn/media/wysiwyg/B_c_3.jpg" alt="" />
            </p>
            <p>
              - Sau khi hoàn tất quy trình mua hàng online trên website, quý
              khách vui lòng kiểm tra thư điện tử Xác Nhận Đơn Hàng với thông
              tin chi tiết về các sản phẩm mà khách hàng đã đặt trước đó.
            </p>
          </div>
        </div>
      </Guide>
      <Guide
        className={guide.type === "sizes" && "active"}
        onClick={handleCloseGuide}
      >
        <div className="wrapper">
          <h4 class="heading">
            <span>Hướng dẫn chọn kích cở</span>
            <button className="btn-close-guide" onClick={handleCloseGuide}>
              <CloseOutlined />
            </button>
          </h4>
          <div class="content">
            <p>
              <img
                src="https://elise.vn/media/wysiwyg/Test/z2533970949840_ad896a5cf67ccd09591b50991eb5d85e.jpg"
                alt=""
              />
            </p>
            <p>
              <img
                src="https://elise.vn/media/wysiwyg/ECOM/size-vn-2404.jpg"
                alt=""
              />
            </p>
            <p>
              <img src="https://elise.vn/media/wysiwyg/ECOM/bq-vn.jpg" alt="" />
            </p>
          </div>
        </div>
      </Guide>
      <Overlay active={guide.type === "buyding" || guide.type === "sizes"} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-bottom: 100px;
  .left {
    max-width: 1060px;
    width: 100%;
    padding: 0 15px;
    .item {
      max-width: 635px;
      margin: 0 auto;
      img {
        width: 100%;
        margin-bottom: 30px;
      }
    }
  }

  .right {
    max-width: 635px;
    width: 100% !important;
    .sticky {
      position: -webkit-sticky;
      position: -moz-sticky;
      position: -ms-sticky;
      position: -o-sticky;
      position: sticky;
      top: 90px;
    }
    .name {
      margin-bottom: 10px;
      padding-right: 80px;
      h1 {
        font-size: 32px;
        font-weight: 500;
        color: #000;
        line-height: normal;
        text-transform: uppercase;
      }
    }
    .price {
      margin-bottom: 20px;
      span {
        font-size: 22px;
      }
    }
    .attribute {
      padding: 40px 0 30px;
      margin-top: 15px;
      padding-top: 40px;
      font-size: 16px;
      position: relative;

      border-top: 1px solid #000;
      .top {
        visibility: hidden;
        position: absolute;
        top: 0;
        width: 100%;
        text-align: center;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
        text-align: center;
        text-decoration: underline;
        font-weight: 500;
        color: #000;
        cursor: pointer;
        &.visibility {
          visibility: visible;
          transition: all 0.3s;
        }
      }
      .description {
        height: 100px;
        overflow: hidden;
        transition: all 0.5s;
        p {
          color: #666;
          font-weight: 400 !important;
          line-height: 1.75;
        }
      }
      .visibility {
        height: 250px;
      }
    }
    .description-bottom {
      min-height: 30px;
      position: absolute;
      right: 0;
      left: 0;
      bottom: 0;
      -webkit-transition: all 0.5s;
      transition: all 0.5s;
      text-align: center;
      text-decoration: underline;
      font-weight: 500;
      color: #000;
      cursor: pointer;
      visibility: visibility;
      &.visibility {
        visibility: hidden;
        transition: all 0.5s;
      }
    }
    .description-bottom::before {
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.1), #fff);
    }

    .product-add-form {
      padding-top: 34px;
      margin-top: 32px;
      border-top: 1px solid #000;
      .item-form {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        min-height: 30px;
        margin-bottom: 10px;
        .label {
          width: 130px;
          font-size: 18px;
        }
        .control {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .item-control {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 30px;
            margin: 7px 30px 7px 0;
            font-size: 16px;
            font-weight: 700;
            background-color: transparent;
            color: #000;
            border-radius: 50%;
            transition: all 0.3s;
            &.active {
              background-color: #000;
              color: #fff;
            }
          }
        }
      }
      .btn {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 32px;
        padding: 0;
      }
    }

    .extra-link {
      .item {
        margin-bottom: 32px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;
        text-transform: uppercase;
        color: #000;
        font-size: 18px;
        svg {
          margin-right: 10px;
        }
      }
    }
  }
`;

const Guide = styled.div`
  position: fixed;
  width: 100%;
  z-index: 999;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s;
  top: 0;
  visibility: hidden;
  opacity: 0;
  transition: all 0.4s;
  &.active {
    opacity: 1;
    visibility: visible;
  }

  .wrapper {
    width: 830px;
    height: 50vh;
    background-color: #fff;
    margin: auto;
    padding: 40px 20px 40px 30px;
    overflow: hidden;
  }
  .heading {
    margin-bottom: 30px;
    font-size: 26px;
    font-weight: 500;
    color: #000;
    text-transform: uppercase;
    position: relative;
  }
  .content {
    height: 100%;
    overflow-y: auto;
    height: 91%;
    strong {
      color: #666;
    }
    /* width */
    &::-webkit-scrollbar {
      width: 4px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: #eee;
      border-radius: 20px;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #000;
      border-radius: 20px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #000;
    }
  }
  .btn-close-guide {
    position: absolute;
    right: 0;
    top: -39px;
    background-color: transparent;
    border: none;
    color: #000;
    padding: 12px;
    font-size: 20px;
  }
  img {
    width: 100%;
  }
`;

export default Product;
