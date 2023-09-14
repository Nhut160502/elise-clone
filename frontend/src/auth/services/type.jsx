import axios from "../../untils/aixos";

export const apiGetType = async () => {
  return axios.get("/type");
};

export const apiStoredType = async (data) => {
  return axios.post("/type", data);
};

export const apiRemoveType = async (id) => {
  return axios.delete(`/type/remove/${id}`);
};

export const apiGetTrashType = async () => {
  return axios.get("/type/trash");
};

export const apiRetoreType = async (id) => {
  return axios.patch(`/type/restore/${id}`);
};

export const apiDestroyType = async (id) => {
  return axios.delete(`/type/destroy/${id}`);
};
