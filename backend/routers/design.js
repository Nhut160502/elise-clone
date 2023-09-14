import express from "express";
import designController from "../controllers/auth/designController.js";
const designRouter = express.Router();

designRouter.get("/", designController.index);
designRouter.post("/", designController.store);
designRouter.get("/trash", designController.trash);
designRouter.delete("/remove/:id", designController.remove);
designRouter.patch("/restore/:id", designController.restore);
designRouter.delete("/destroy/:id", designController.destroy);

export default designRouter;
