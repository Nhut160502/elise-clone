import Toast from "../auth/components/Toast";
import axiosSetup from "./aixos";

const axiosInterceptors = (store) => {
  // Add a request interceptor
  axiosSetup.interceptors.request.use(
    function (config) {
      const accessToken = store.getState().auth?.user?.data?.accessToken;
      config.headers.Authorization = accessToken;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axiosSetup.interceptors.response.use(
    function (response) {
      return response.data;
    },
    function (error) {
      if (error.response.data.err.name === "ValidationError") {
        const errs = Object.keys(error.response.data.err.errors);
        errs.map((err) => Toast("warning", err + " required"));
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInterceptors;
