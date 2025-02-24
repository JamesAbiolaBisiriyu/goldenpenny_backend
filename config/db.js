// import mongoose from "mongoose";

// export const connectdb = async ()=> {
//   await mongoose.connect('mongodb+srv://emperor2g:Godchild1982@cluster0.dacbl.mongodb.net/?').then (()=>console.log('DB CONNECTED'))
// }

// //mongodb+srv://emperor2g:Godchild1982@cluster0.dacbl.mongodb.net


const mongoose = require("mongoose");

const connectdb = async () => {
  await mongoose
    .connect("mongodb+srv://emperor2g:Godchild1982@cluster0.dacbl.mongodb.net/?")
    .then(() => console.log("DB CONNECTED"))
    .catch((err) => console.error("DB Connection Error:", err));
};

module.exports = { connectdb };
