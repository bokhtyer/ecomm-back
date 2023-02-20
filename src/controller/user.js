const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModal = require('../models/user.js');





/*
* Register API
* */
const signup = async (req,res) => {
    const {email,name,password} = req.body;
    try {
        const oldUser = await UserModal.findOne({ email });
        if(oldUser){
            return res.status(400).json({
                message:"User already exit"
            })
        }
        const hashedPassword = await bcrypt.hash(password,12);
        const result = await UserModal.create({
            email,
            password:hashedPassword,
            name
        });
        const token = jwt.sign({email: result.email, id: result._id},process.env.SCERET,{expiresIn:"1h"});
        res.status(201).json({
            result,
            token,
            message:"User Created Successfully"
        });
    } catch (error){
        res.status(500).json({
            message:"Something went wrong"
        });
        console.log(error);
    }
}
module.exports = signup;
