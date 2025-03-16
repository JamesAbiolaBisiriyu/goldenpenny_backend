
const userModel = require("../models/userModel");

// Add items to user cart
const addToCart = async (req, res) => {
  try {
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

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const userData = await userModel.findOne({ _id: req.body.userId });

    if (!userData || !userData.cartData || !userData.cartData[req.body.itemId]) {
      return res.status(404).json({ success: false, message: "Item not found in cart" });
    }

    delete userData.cartData[req.body.itemId];

    await userModel.findByIdAndUpdate(req.body.userId, { cartData: userData.cartData });

    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.error("Error in removeFromCart:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Fetch user cart
const getCart = async (req, res) => {
  try {
    const userData = await userModel.findOne({ _id: req.body.userId });

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, cart: userData.cartData || {} });
  } catch (error) {
    console.error("Error in getCart:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


module.exports = { addToCart, removeFromCart, getCart };
