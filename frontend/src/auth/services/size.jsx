import axios from "../../untils/aixos";

export const apiGetSizes = () => {
  return axios.get("/size");
};

export const apiStoreSize = (data) => {
  return axios.post("/size", data);
};
