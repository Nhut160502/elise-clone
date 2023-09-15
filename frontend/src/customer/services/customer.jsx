import axios from "../../untils/aixos";
export const getCategories = () => {
  return axios.get("/customer/categories");
};

export const getTypes = () => {
  return axios.get("/customer/types");
};
export const getProducts = () => {
  return axios.get("/customer/products");
};

export const getProduct = (slug) => {
  return axios.get(`/customer/products/${slug}`);
};

export const getCollections = () => {
  return axios.get("/customer/collections");
};
