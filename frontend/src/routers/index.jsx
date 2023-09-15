import DefaultLayout from "../auth/Layouts/DefaultLayout";
import Itemlayout from "../auth/Layouts/ItemLayout";
import Dashobard from "../auth/pages/Home";
import Login from "../auth/pages/Login";
import Register from "../auth/pages/Register";

import ListCollection from "../auth/pages/Collection/List";
import AddCollection from "../auth/pages/Collection/Add";
import TrashCollection from "../auth/pages/Collection/Trash";

import ListType from "../auth/pages/Type/List";
import AddType from "../auth/pages/Type/Add";
import TrashType from "../auth/pages/Type/Trash";

import ListCategory from "../auth/pages/Category/List";
import AddCategory from "../auth/pages/Category/Add";
import TrashCategory from "../auth/pages/Category/Trash";

import ListProduct from "../auth/pages/Product/List";
import AddProduct from "../auth/pages/Product/Add";
import TrashProduct from "../auth/pages/Product/Trash";
import DetailProduct from "../auth/pages/Product/Detail";

import DefaultLayoutCustomer from "../customer/layouts/DefaultLayout";
import Home from "../customer/pages/Home";
import Product from "../customer/pages/Product";
import Lookbook from "../customer/pages/Lookbook";
import Type from "../customer/pages/Type";
import Category from "../customer/pages/Category";
import Cart from "../customer/pages/Cart";
import Checkout from "../customer/pages/Checkout";
import Collection from "../customer/pages/Collection";

export const Private = [
  {
    path: "/dashboard",
    element: Dashobard,
    layout: DefaultLayout,
  },
  {
    path: "/dashboard/login",
    element: Login,
    layout: Itemlayout,
  },
  {
    path: "/dashboard/register",
    element: Register,
    layout: Itemlayout,
  },

  // Router collection
  {
    path: "/dashboard/collection",
    element: ListCollection,
    layout: DefaultLayout,
  },
  {
    path: "/dashboard/collection/stored",
    element: AddCollection,
    layout: DefaultLayout,
  },

  {
    path: "/dashboard/collection/trash",
    element: TrashCollection,
    layout: DefaultLayout,
  },

  // Router type
  {
    path: "/dashboard/type",
    element: ListType,
    layout: DefaultLayout,
  },
  {
    path: "/dashboard/type/stored",
    element: AddType,
    layout: DefaultLayout,
  },

  {
    path: "/dashboard/type/trash",
    element: TrashType,
    layout: DefaultLayout,
  },

  // Router category
  {
    path: "/dashboard/category",
    element: ListCategory,
    layout: DefaultLayout,
  },
  {
    path: "/dashboard/category/stored",
    element: AddCategory,
    layout: DefaultLayout,
  },

  {
    path: "/dashboard/category/trash",
    element: TrashCategory,
    layout: DefaultLayout,
  },

  // Router category
  {
    path: "/dashboard/product",
    element: ListProduct,
    layout: DefaultLayout,
  },
  {
    path: "/dashboard/product/:slugProduct",
    element: DetailProduct,
    layout: DefaultLayout,
  },
  {
    path: "/dashboard/product/stored",
    element: AddProduct,
    layout: DefaultLayout,
  },

  {
    path: "/dashboard/product/trash",
    element: TrashProduct,
    layout: DefaultLayout,
  },
];

export const Public = [
  {
    path: "/",
    element: Home,
    layout: DefaultLayoutCustomer,
  },
  {
    path: "/:slugType.html",
    element: Category,
    layout: DefaultLayoutCustomer,
  },
  {
    path: "/p/:slugProduct.html",
    element: Product,
    layout: DefaultLayoutCustomer,
  },
  {
    path: "/lookbook",
    element: Lookbook,
    layout: DefaultLayoutCustomer,
  },
  {
    path: "/lookbook/:slugCollection",
    element: Collection,
    layout: DefaultLayoutCustomer,
  },
  {
    path: "/:slugType",
    element: Type,
    layout: DefaultLayoutCustomer,
  },
  {
    path: "/:slugType/:slugCategory.html",
    element: Category,
    layout: DefaultLayoutCustomer,
  },
  {
    path: "/checkout/cart",
    element: Cart,
    layout: DefaultLayoutCustomer,
  },
  {
    path: "/checkout",
    element: Checkout,
    layout: DefaultLayoutCustomer,
  },
];
