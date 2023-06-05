import express from 'express'
const router =express.Router();
import CartController from '../Controller/CartController.js';


router.post('/' , CartController.CartItem)

export default router