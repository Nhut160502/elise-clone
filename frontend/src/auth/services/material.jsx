import axios from "../../untils/aixos";

export const apiGetMaterials = () => {
  return axios.get("/material");
};

export const apiStoreMaterial = async (data) => {
  return axios.post("/material", data);
};
