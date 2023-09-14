import express from "express";
import { upload } from "../configs/multer.js";
import productController from "../controllers/auth/productController.js";

const productsRouter = express.Router();

productsRouter.get("/", productController.index);
productsRouter.get("/trash", productController.trash);
productsRouter.post("/", upload.array("files"), productController.store);
productsRouter.get("/:slug", productController.show);
productsRouter.put("/:id", upload.array("files"), productController.update);
productsRouter.delete("/remove/:id", productController.remove);
productsRouter.patch("/restore/:id", productController.restore);
productsRouter.post("/destroy/image/:id", productController.destroyImage);
productsRouter.delete("/destroy/:id", productController.destroy);

export default productsRouter;
