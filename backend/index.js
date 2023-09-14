import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDatabase from "./configs/database.js";
import router from "./routers/index.js";
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(process.cwd() + "/images"));
app.use("/api/v1", router);
connectDatabase();
app.listen(process.env.PORT, () => {
  console.log(`App running http://localhost:${process.env.PORT}`);
});
