import express from "express";
import typeProductController from "../controllers/auth/typeProductController.js";

const typeProductRouter = express.Router();

typeProductRouter.get("/", typeProductController.index);

typeProductRouter.get("/trash", typeProductController.trash);

typeProductRouter.post("/", typeProductController.store);

typeProductRouter.get("/:slug", typeProductController.show);

typeProductRouter.put("/:id", typeProductController.update);

typeProductRouter.delete("/remove/:id", typeProductController.remove);

typeProductRouter.patch("/restore/:id", typeProductController.restore);

typeProductRouter.delete("/destroy/:id", typeProductController.destroy);

export default typeProductRouter;
