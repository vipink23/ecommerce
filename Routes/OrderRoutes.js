import express from "express";
const router = express.Router();
import OrderController from '../Controller/OrderController.js'



router.post('/', OrderController.OrderItems)

export default router