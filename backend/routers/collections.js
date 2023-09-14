import express from "express";
import collectionsController from "../controllers/auth/collectionsController.js";
import { upload } from "../configs/multer.js";

const collectionsRouter = express.Router();

collectionsRouter.get("/", collectionsController.index);
collectionsRouter.get("/trash", collectionsController.trash);
collectionsRouter.post("/", upload.single("file"), collectionsController.store);
collectionsRouter.get("/:slug", collectionsController.show);
collectionsRouter.put(
  "/:id",
  upload.single("file"),
  collectionsController.update
);

collectionsRouter.delete("/remove/:id", collectionsController.remove);
collectionsRouter.patch("/restore/:id", collectionsController.restore);
collectionsRouter.delete("/destroy/:id", collectionsController.destroy);

export default collectionsRouter;
