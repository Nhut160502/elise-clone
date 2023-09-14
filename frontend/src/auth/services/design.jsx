import axios from "../../untils/aixos";

export const apiGetDesigns = () => {
  return axios.get("/design");
};

export const apiStoreDesign = async (data) => {
  return axios.post("/design", data);
};
