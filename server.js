const express = require("express");
const app = express();
const cors = require("cors")
const morgan = require("morgan")
const dotenv = require("dotenv")
const colors = require("colors")
const PORT = 8000 || process.env.PORT;
const path = require("path")
const connectDb = require("./config/connectDB")
// config dot env file
dotenv.config()

// middle wares
app.use(cors());
app.use(morgan("dev"))
app.use(express.json());
//database calling 
connectDb();
// routes
// user
app.use("/api/v1/user",require("./routes/userRoutes"))
// transaction
app.use("/api/v1/transactions",require("./routes/transactionRoutes"))

if(process.env.NODE_ENV == 'production'){
    // Static flies
app.use(express.static(path.join(__dirname,"./client/build")))
app.get("*",(req,res)=>{
res.sendFile(path.join(__dirname,"./client/build/index.html"))
})
}

// /listen
app.listen(PORT,()=>{
console.log("server running");
})