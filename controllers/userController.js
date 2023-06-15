const userModel = require("../models/userModel")

//login call back
const loginController = async (req,res) => {
    try {
        const { email, password } = req.body;
        const userData = await userModel.findOne({ email, password });
        if (!userData) {
            return res.status(400).send("User Not Found")
        }
        res.status(200).json({ userData, success: true });
    } catch (err) {
        res.status(400).json({
            success: false,
            err,
        })
    }
}

// register call back
const registerController = async(req,res) => {
    try{
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).json({
            success:true,
            newUser
        })
    }catch(err){
        res.status(400).json({
            success:false,
            err
        })
    }
}
module.exports = { loginController, registerController };