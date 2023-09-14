import axios from "../../untils/aixos";

export const apiGetCollections = async () => {
  return axios.get("/collection");
};

export const apiGetTrashCollections = async () => {
  return axios.get("/collection/trash");
};

export const apiStoredCollection = async (data) => {
  return axios.post("/collection", data);
};

export const apiRemoveCollection = async (id) => {
  return axios.delete(`/collection/remove/${id}`);
};

export const apiRestoreCollection = async (id) => {
  return axios.patch(`/collection/restore/${id}`);
};

export const apiDestroyCollection = async (id) => {
  return axios.delete(`/collection/destroy/${id}`);
};
