import { Button } from "antd";
import React, { memo, useEffect } from "react";
import { Image } from "react-bootstrap";
import { styled } from "styled-components";
import { CloseOutlined, RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeSlibar } from "../providers/slibarSlice";
import Loading from "../../auth/components/Loading";
import { idNavOpen } from "../providers/navSlice";
import { customerGetCategories, customerGetTypes } from "../services/customer";
import { getDataCategories } from "../providers/categoriesSlice";
import { getDataTypes } from "../providers/typesSlice";
const Navbar = () => {
  const dispatch = useDispatch();
  const openSlibar = useSelector((state) => state?.slibar?.open);
  const stateApi = useSelector((state) => state?.stateApi?.isFetching);
  const types = useSelector((state) => state?.types?.data);
  const categories = useSelector((state) => state?.categories?.data);

  const openNav = useSelector((state) => state?.nav);

  const getList = async () => {
    try {
      await customerGetTypes().then((res) => {
        dispatch(getDataTypes(res.data));
      });
      await customerGetCategories().then((res) => {
        dispatch(getDataCategories(res.data));
      });
    } catch (error) {}
  };

  useEffect(() => {
    getList();
    dispatch(idNavOpen(null));
  }, []);

  return (
    <Wrapper
      onMouseLeave={() => dispatch(closeSlibar())}
      className={openSlibar && "active"}
    >
      <Loading open={stateApi} />
      <Top>
        <Image src="http://localhost:8080/logo_color.png"></Image>
        <Button
          icon={<CloseOutlined />}
          onClick={() => dispatch(closeSlibar())}
        />
      </Top>
      <Content>
        <ul className="navbar">
          <li className="navbar-item">
            <Link to="/lookbook">
              <span>Bộ Sưu Tập</span>
            </Link>
          </li>
          {types?.map((type) => (
            <li
              className="navbar-item"
              onMouseOver={() => dispatch(idNavOpen(type._id))}
            >
              <Link to={`/${type.slug}`}>
                <span>{type.name}</span>
                <Button icon={<RightOutlined />} />
              </Link>
              <SubNav>
                <ul
                  className={
                    openNav.id === type._id ? "sub-nav open" : "sub-nav"
                  }
                >
                  {categories?.map((category) => {
                    if (category.type._id === type._id) {
                      return (
                        <li className="sub-nav-item">
                          <Link to={`/${type.slug}/${category.slug}.html`}>
                            <span>{category.name}</span>
                          </Link>
                        </li>
                      );
                    }
                  })}
                </ul>
              </SubNav>
            </li>
          ))}
        </ul>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: block;
  min-width: 345px;
  max-width: 435px;
  padding: 60px 28px 128px 56px;
  background: #fff;
  -webkit-transition: all 1s;
  transition: all 1s;
  position: fixed;
  left: -100%;
  top: 0;
  bottom: 0;
  z-index: 9999;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
  &.active {
    left: 0;
  }
`;
const Top = styled.div`
  margin-bottom: 60px;
  button {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background-color: transparent !important;
  }
`;
const Content = styled.div`
  .navbar {
    display: block;
    .navbar-item {
      margin-bottom: 7px;
      display: block;
      position: relative;
      > a {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: #000;
        text-transform: uppercase;
        > button {
          display: flex;
          justify-content: center;
          align-items: center;
          border: none;
          position: absolute;
          right: 0;
        }
        > span {
          font-size: 18px;
          line-height: normal;
          font-weight: 500;
        }
      }
    }
  }
`;
const SubNav = styled.div`
  .sub-nav {
    padding-left: 0;
    max-height: 0px;
    overflow-y: hidden;
    transition: all 0.4s ease;
    .sub-nav-item {
      width: 100%;
      display: block;
      position: relative;
      margin-bottom: 7px;
      transition: all 0.4s ease;
      a {
        display: block;
        span {
          color: #000;
          text-transform: uppercase;
          font-size: 14px;
          font-weight: 400;
        }
      }
    }
    &.open {
      max-height: 200px;
      margin-top: 7px;
    }
  }
`;

export default memo(Navbar);
