import express from "express";
import typeProductRouter from "./typeProduct.js";
import categoriesRouter from "./categories.js";
import productRouter from "./products.js";
import collectionsRouter from "./collections.js";
import productsRouter from "./products.js";
import authRouter from "./auth.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import colorRouter from "./color.js";
import sizeRouter from "./size.js";
import designRouter from "./design.js";
import materialRouter from "./material.js";
import categoriesController from "../controllers/customer/categoriesController.js";
import typesController from "../controllers/customer/typesController.js";

const router = express.Router();

// auth
router.use("/auth", authRouter);
router.use("/type", authMiddleware.verifyToken, typeProductRouter);
router.use("/categories", authMiddleware.verifyToken, categoriesRouter);
router.use("/product", authMiddleware.verifyToken, productRouter);
router.use("/collection", authMiddleware.verifyToken, collectionsRouter);
router.use("/products", authMiddleware.verifyToken, productsRouter);
router.use("/color", authMiddleware.verifyToken, colorRouter);
router.use("/size", authMiddleware.verifyToken, sizeRouter);
router.use("/design", authMiddleware.verifyToken, designRouter);
router.use("/material", authMiddleware.verifyToken, materialRouter);

// customer
router.get("/customer/categories", categoriesController.index);
router.get("/customer/types", typesController.index);

export default router;
