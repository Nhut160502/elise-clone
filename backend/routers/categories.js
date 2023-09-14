import express from "express";
import categoriesController from "../controllers/auth/categoriesController.js";
const categoriesRouter = express.Router();

categoriesRouter.get("/", categoriesController.index);

categoriesRouter.get("/trash", categoriesController.trash);

categoriesRouter.post("/", categoriesController.store);

categoriesRouter.get("/:slug", categoriesController.show);

categoriesRouter.put("/:id", categoriesController.update);

categoriesRouter.delete("/:id", categoriesController.remove);

categoriesRouter.patch("/restore/:id", categoriesController.restore);

categoriesRouter.delete("/destroy/:id", categoriesController.destroy);

export default categoriesRouter;
