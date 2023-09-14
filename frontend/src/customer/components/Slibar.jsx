import { styled } from "styled-components";
import Slider from "react-slick";
import { Link } from "react-router-dom";
function Slibar() {
  var settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Wrapper>
      <Slider {...settings}>
        <Item>
          <Link to="/type/thoi-trang-nu">
            <img
              src="https://elise.vn/media/wysiwyg/BANNER/cv-shades-of-lace.jpg"
              alt=""
            />
          </Link>
        </Item>
        <Item>
          <Link to="/type/thoi-trang-nu">
            <img
              src="https://elise.vn/media/wysiwyg/BANNER/cv-legacy-vere.jpg"
              alt=""
            />
          </Link>
        </Item>
        <Item>
          <Link to="/type/thoi-trang-nu">
            <img src="https://elise.vn/media/wysiwyg/ECOM/cv-0609.jpg" alt="" />
          </Link>
        </Item>
      </Slider>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
  text-align: center;
  .slick-thumb {
    position: absolute;
    bottom: 20px;
    li button:before {
      font-size: 15px;
    }
  }
`;

const Item = styled.div`
  img {
    width: 100%;
  }
`;
export default Slibar;
