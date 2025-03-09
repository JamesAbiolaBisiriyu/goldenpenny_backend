const express = require ("express");
const { getCart, addToCart, removeFromCart } = require("../controllers/cartController");

const cartRouter = express.Router();

cartRouter.post("/add",addToCart)
cartRouter.post("/remove",removeFromCart)
cartRouter.post("/get",getCart)


module.exports = cartRouter;