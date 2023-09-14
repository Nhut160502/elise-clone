import axios from "../../untils/aixos";

export const apiGetCategories = async () => {
  return axios.get("/categories");
};

export const apiGetTrashCategories = async () => {
  return axios.get("/categories/trash");
};

export const apiStoredCategories = async (data) => {
  return axios.post("/categories", data);
};

export const apiRemoveCategories = async (id) => {
  return axios.delete(`/categories/${id}`);
};

export const apiRestoreCategories = async (id) => {
  return axios.patch(`/categories/restore/${id}`);
};

export const apiDestroyCategories = async (id) => {
  return axios.delete(`/categories/destroy/${id}`);
};

// customer
