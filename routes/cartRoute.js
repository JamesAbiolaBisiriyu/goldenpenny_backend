const express = require ("express");
const { getCart, addToCart, removeFromCart } = require("../controllers/cartController.js");
const authMiddleware = require("../middleware/auth.js");

const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware, addToCart)
cartRouter.post("/remove",authMiddleware, removeFromCart)
cartRouter.post("/get",authMiddleware,getCart)


module.exports = cartRouter;