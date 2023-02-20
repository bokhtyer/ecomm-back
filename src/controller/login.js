const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModal = require('../models/user.js');


/*
* Sign In API
* */
const login = async (req,res) => {
    const {email,password} = req.body;
    try{
        const oldUser = await UserModal.findOne({ email });
        if(!oldUser)
            return res.status(404).json({
                message:"User not found"
            });
        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
        if(!isPasswordCorrect)
            return  res.status(400).json({
                message:"Invalid Credentials"
            });
        const token = jwt.sign({email: oldUser.email, id: oldUser._id,role:oldUser.role},process.env.SCERET,{expiresIn:"1d"});
        res.cookie('token',token,{expiresIn:"1d"});
        res.status(200).json({
            createdAt:oldUser.createdAt,
            name: oldUser.name,
            email: oldUser.email,
            role:oldUser.role,
            profile_picture:oldUser.profile_picture,
            id:oldUser._id,
            token,
        });
    }catch (error){
        res.status(500).json({
            message:"Something went wrong"
        });
        console.log(error);
    }
}
module.exports = login;
