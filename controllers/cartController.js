
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");


// Add items to user cart
const addToCart = async (req, res) => {
  try {
    console.log("Auth header (addToCart):", req.headers.authorization);
    const userData = await userModel.findById(req.user._id);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Ensure cartData is not null
    if (!userData.cartData) {
      userData.cartData = {};
    }

    if (!userData.cartData[req.body.itemId]) {
      userData.cartData[req.body.itemId] = 1;
    } else {
      userData.cartData[req.body.itemId] += 1;
    }

    // Update user cartData
    await userModel.findByIdAndUpdate(req.user._id, { cartData: userData.cartData });

    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



const removeFromCart = async (req, res) => {
  try {
    console.log("Auth header (removeFromCart):", req.headers.authorization);
    console.log("Received request body:", req.body);

    let userData = await userModel.findById(req.user._id);


    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (cartData[req.body.itemId] && cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
      if (cartData[req.body.itemId] === 0) {
        delete cartData[req.body.itemId]; // Remove item if quantity reaches 0
      }
    } else {
      return res.status(400).json({ success: false, message: "Item not in cart" });
    }

    await userModel.findByIdAndUpdate(req.user._id, { cartData });


    res.json({ success: true, message: "Removed from Cart" });
  } catch (error) {
    console.error("Error in removeFromCart:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



const JWT_SECRET = 'random#secret'; // same key used to sign the token

const getCart = async (req, res) => {
  try {
    console.log("Auth header (getCart):", req.headers.authorization);
    const token = req.headers.authorization?.split(' ')[1]; // Expecting: Bearer <token>
    if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    const userData = await userModel.findById(userId);
    const cartData = userData.cartData;

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'error' });
  }
};



module.exports = { addToCart, removeFromCart, getCart };
