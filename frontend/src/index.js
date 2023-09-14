import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axiosInterceptors from "./untils/interceptors";

import "./index.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { dashboardStore } from "./redux/dashboardStore";

axiosInterceptors(dashboardStore);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
