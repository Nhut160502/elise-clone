import express from "express";
import colorController from "../controllers/auth/colorController.js";
const colorRouter = express.Router();

colorRouter.get("/", colorController.index);
colorRouter.post("/", colorController.store);
colorRouter.get("/trash", colorController.trash);
colorRouter.delete("/remove/:id", colorController.remove);
colorRouter.patch("/restore/:id", colorController.restore);
colorRouter.delete("/destroy/:id", colorController.destroy);

export default colorRouter;
