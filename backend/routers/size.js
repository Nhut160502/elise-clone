import express from "express";
import sizeController from "../controllers/auth/sizeController.js";
const sizeRouter = express.Router();

sizeRouter.get("/", sizeController.index);
sizeRouter.post("/", sizeController.store);
sizeRouter.get("/trash", sizeController.trash);
sizeRouter.delete("/remove/:id", sizeController.remove);
sizeRouter.patch("/restore/:id", sizeController.restore);
sizeRouter.delete("/destroy/:id", sizeController.destroy);

export default sizeRouter;
