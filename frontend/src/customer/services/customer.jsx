import axios from "../../untils/aixos";
export const customerGetCategories = () => {
  return axios.get("/customer/categories");
};

export const customerGetTypes = () => {
  return axios.get("/customer/types");
};
