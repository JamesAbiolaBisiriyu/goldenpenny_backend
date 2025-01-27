import mongoose from "mongoose";

export const connectdb = async ()=> {
  await mongoose.connect('mongodb+srv://emperor2g:Godchild1982@cluster0.dacbl.mongodb.net/?').then (()=>console.log('DB CONNECTED'))
}