import axios from "../../untils/aixos";

export const apiGetProducts = async () => {
  return axios.get("/products");
};

export const apiShowProduct = async (slug) => {
  return axios.get(`/product/${slug}`);
};

export const apiGetTrashProducts = async () => {
  return axios.get("/products/trash");
};

export const apiUpdateProduct = async (id, data) => {
  return axios.put(`/products/${id}`, data);
};

export const apiStoredProduct = async (data) => {
  return axios.post("/product", data);
};

export const apiRemoveProduct = async (id) => {
  return axios.delete(`/product/remove/${id}`);
};

export const apiRetoreProduct = async (id) => {
  return axios.patch(`/product/restore/${id}`);
};

export const apiDestroyProduct = async (id) => {
  return axios.delete(`/product/destroy/${id}`);
};

export const apiDestroyImage = async (id, index) => {
  return axios.post(`/product/destroy/image/${id}`, { index: index });
};
