import express from "express"
import cors from "cors"
const http = require('http');



//app config
const app = express()
const port = 4000



//middleware
app.use(express.json())
app.use(cors())

app.get("/",(req, req)=>{
  resizeBy.send("API Working")
})






// http.createServer((req, res)=>{
// console.log('A new request recieved');

// });