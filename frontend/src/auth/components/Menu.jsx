import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronRight,
  faDashboard,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const menuList = [
  {
    id: 1,
    title: "Dashboard",
    icon: faDashboard,
    to: "/dashboard",
  },
  {
    id: 2,
    title: "Loại sản phẩm",
    icon: faBars,
    subMenu: [
      {
        id: "type1",
        titleSub: "Danh sách loại sản phẩm",
        toSub: "/dashboard/type",
        idParent: 2,
      },
      {
        id: "type2",
        titleSub: "Thêm loại sản phẩm",
        toSub: "/dashboard/type/stored",
        idParent: 2,
      },
    ],
  },
  {
    id: 3,
    title: "Bộ sưu tập",
    icon: faBars,
    subMenu: [
      {
        id: "collection1",
        titleSub: "Danh sách bộ sưu tập",
        toSub: "/dashboard/collection",
        idParent: 3,
      },
      {
        id: "collection2",
        titleSub: "Thêm bộ sưu tập",
        toSub: "/dashboard/collection/stored",
        idParent: 3,
      },
    ],
  },
  {
    id: 4,
    title: "Danh mục",
    icon: faBars,
    subMenu: [
      {
        id: "category1",
        titleSub: "Danh sách danh mục",
        toSub: "/dashboard/category",
        idParent: 4,
      },
      {
        id: "category2",
        titleSub: "Thêm danh mục",
        toSub: "/dashboard/category/stored",
        idParent: 4,
      },
    ],
  },
  {
    id: 5,
    title: "Sản Phẩm",
    icon: faBars,
    subMenu: [
      {
        id: "product1",
        titleSub: "Danh sách sản phẩm",
        toSub: "/dashboard/product",
        idParent: 4,
      },
      {
        id: "product2",
        titleSub: "Thêm sản phẩm",
        toSub: "/dashboard/product/stored",
        idParent: 4,
      },
    ],
  },
];

const Menu = () => {
  const localActive = JSON.parse(localStorage.getItem("activeMenu")) || {
    idMenu: "",
    idSubMenu: "",
  };
  const localListIdMenu = JSON.parse(localStorage.getItem("listIdMenu")) || [];

  const [listIdMenu, setListIdMenu] = useState(localListIdMenu);
  const [active, setActive] = useState(localActive);

  useEffect(() => {
    if (window.location.pathname) {
      menuList.map((menu) => {
        if (menu.to) {
          if (menu.to === window.location.pathname) {
            setListIdMenu([menu.id]);
            setActive({ idMenu: menu.id, idSubMenu: "" });
            localStorage.setItem("listIdMenu", JSON.stringify([menu.id]));
            localStorage.setItem(
              "activeMenu",
              JSON.stringify({ idMenu: menu.id, idSubMenu: "" })
            );
          }
        } else {
          menu.subMenu.map((item) => {
            if (item.toSub === window.location.pathname) {
              setListIdMenu([menu.id]);
              setActive({ idMenu: menu.id, idSubMenu: item.id });
              localStorage.setItem("listIdMenu", JSON.stringify([menu.id]));
              localStorage.setItem(
                "activeMenu",
                JSON.stringify({ idMenu: menu.id, idSubMenu: item.id })
              );
            }
          });
        }
      });
    }
  }, []);

  const handleClickMenu = (id, to) => {
    if (to) {
      setListIdMenu([id]);
      setActive({ idMenu: id, idSubMenu: "" });
      localStorage.setItem("listIdMenu", JSON.stringify([id]));
      localStorage.setItem(
        "activeMenu",
        JSON.stringify({ idMenu: id, idSubMenu: "" })
      );
    } else {
      if (listIdMenu.includes(id)) {
        setListIdMenu(listIdMenu.filter((newId) => newId !== id));
        const arr = localListIdMenu.filter((newId) => newId !== id);
        localStorage.setItem("listIdMenu", JSON.stringify(arr));
      } else {
        setListIdMenu((pre) => [...pre, id]);
        localListIdMenu.push(id);
        localStorage.setItem("listIdMenu", JSON.stringify(localListIdMenu));
      }
    }
  };

  const handleClickSubMenu = (idMenu, idSubMenu) => {
    setActive({ idMenu: idMenu, idSubMenu: idSubMenu });
    localStorage.setItem(
      "activeMenu",
      JSON.stringify({ idMenu: idMenu, idSubMenu: idSubMenu })
    );
  };

  return (
    <Wrapper>
      {menuList.map((menu) => {
        let Tag = Link;
        if (!menu.to) {
          Tag = "div";
        }
        return (
          <MenuContent key={menu.id}>
            <Tag
              to={menu.to}
              className={
                active.idMenu === menu.id ? "menu-item active" : "menu-item "
              }
              onClick={() => handleClickMenu(menu.id, menu.to)}
            >
              <span>
                <FontAwesomeIcon icon={menu.icon} />
                <span to={menu.to}>{menu.title}</span>
              </span>
              {menu.subMenu && (
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className={listIdMenu.includes(menu.id) ? "rotate" : ""}
                />
              )}
            </Tag>
            {menu.subMenu && (
              <SubMenu className={listIdMenu.includes(menu.id) && "active"}>
                {menu.subMenu.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => handleClickSubMenu(menu.id, item.id)}
                    className={item.id === active.idSubMenu && "active"}
                  >
                    <Link to={item.toSub}>{item.titleSub}</Link>
                  </li>
                ))}
              </SubMenu>
            )}
          </MenuContent>
        );
      })}
    </Wrapper>
  );
};
const Wrapper = styled.ul`
  padding: 0;
  .active {
    span,
    svg {
      color: #339cfd;
    }
  }
  .rotate {
    rotate: 90deg;
  }

  .menu-item {
    padding: 4px 20px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > span {
      display: flex;
      align-items: center;
      svg {
        padding-top: 0;
      }
    }

    a {
      width: 100%;
    }

    &:hover a,
    &:hover span,
    &:hover svg {
      color: #339cfd;
    }
    svg {
      margin-right: 16px;
    }
  }
`;
const MenuContent = styled.li`
  a,
  span,
  svg {
    display: block;
    font: 16px;
    color: #fff;
    transition: all 0.4s;
    padding: 2px 0;
  }
`;
const SubMenu = styled.ul`
  margin-top: 4px;
  padding: 0;
  max-height: 0px;
  overflow-y: hidden;
  transition: all 0.5s;
  background: rgba(1, 80, 154, 0.05);
  &.active {
    max-height: 100px;
  }
  li {
    padding-left: 20px;
    &.active a {
      color: #339cfd;
    }
  }

  li a {
    padding: 8px 0 8px 10px;
  }

  a:hover {
    color: #339cfd;
  }
`;
export default Menu;
