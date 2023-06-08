import express from "express";
const router = express.Router();
import ProductsController from "../Controller/ProductsController.js";

router.get("/", ProductsController.ProductGet);
router.post("/", ProductsController.ProductPost);
router.get("/:id", ProductsController.ProductGetById);
router.patch("/:id", ProductsController.ProductPatch);

export default router;
