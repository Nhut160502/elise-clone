import axios from "../../untils/aixos";

export const apiGetColors = async () => {
  return axios.get("/color");
};

export const apiStoreColor = async (data) => {
  return axios.post("/color", data);
};
