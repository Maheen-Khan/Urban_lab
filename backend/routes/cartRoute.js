
import express from 'express';
import { addToCart, confirmPurchase, getCart, removeFromCart } from '../controllers/cartController.js';
import authMiddleware from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post("/get",authMiddleware,getCart);
cartRouter.post("/add",authMiddleware,addToCart);
cartRouter.delete("/remove",authMiddleware,removeFromCart);
cartRouter.post("/confirm", authMiddleware, confirmPurchase)

export default cartRouter;
