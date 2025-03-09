// import express from "express"
// import cors from "cors"
// import path from "path";
// import { connectdb } from "./config/db.js"
// import foodRouter from "./routes/foodRoute.js"
// import { fileURLToPath } from "url";




// //app config
// const app = express()
// const port = 4000



// //middleware
// app.use(express.json())
// app.use(cors())
// // app.use(express.static('./'))





// //db connection
// connectdb();

// //api endpoints
// app.use("/api/food",foodRouter)

// app.get("/",(req, res)=>{
//   res.send("API Working")
// })


// app.listen(port, ()=>{
//   console.log(`Server started on http://localhost:${port}`);
  
// })




// //mongodb+srv://emperor2g:Godchild1982@cluster0.dacbl.mongodb.net/?



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
