const express = require("express");
const cors = require("cors");
const { connectdb } = require("./config/db");
const foodRouter = require("./routes/foodRoute");
const userRouter = require("./routes/userRoutes"); // Fixed import
require("dotenv/config"); // Ensure dotenv is loaded properly
const cartRouter = require("./routes/cartRoute");

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
connectdb();

// API Endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter); // Ensure this is correct
app.use("/images", express.static("uploads"));
app.use("/api/cart",cartRouter)

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
