import express from "express";
import materialController from "../controllers/auth/materialController.js";
const materialRouter = express.Router();

materialRouter.get("/", materialController.index);
materialRouter.post("/", materialController.store);
materialRouter.get("/trash", materialController.trash);
materialRouter.delete("/remove/:id", materialController.remove);
materialRouter.patch("/restore/:id", materialController.restore);
materialRouter.delete("/destroy/:id", materialController.destroy);

export default materialRouter;
