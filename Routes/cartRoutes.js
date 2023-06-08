import express from "express";
const router = express.Router();
import CartController from "../Controller/CartController.js";
import validateToken from "../Middleware/validateTokenHandler.js";

// router.use(validateToken)
router.post("/", validateToken, CartController.CartItem);
router.get("/", CartController.getCartItems);

export default router;
