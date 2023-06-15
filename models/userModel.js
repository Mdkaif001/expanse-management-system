const mongoose = require("mongoose");
const validator = require("validator")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"Password is required"],
        unique:true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error("Invalid email")
            }
        }
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

// exports
const userModel = mongoose.model("user",userSchema)
module.exports = userModel;