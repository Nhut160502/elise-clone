import axios from "axios";

const axiosSetup = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: { token: `Bearer ${localStorage.getItem("accessToken")}` },
});

export default axiosSetup;
