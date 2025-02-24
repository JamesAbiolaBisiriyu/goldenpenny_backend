const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
  name: String,required:true,
  email: { type: String, required: true, unique: true, unique: true },
  password:{String, required:true},
  cartData:{type:Object,default:{}}
},{minimize:false})

const userModel = mongoose.models.user || mongoose.model("user",userSchema);
export default userModel