const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:30
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:false
    },
    googleId:{
        type:String,
        required:false
    },
    id:{
        type:String
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    profile_picture:{
        type:String,
        default:''
    }
    // username:{
    //     type:String,
    //     trim:true,
    //     min:3,
    //     max:30,
    //     unique:true,
    //     index:true,
    //     lowercase:true
    // },

},{ timestamps:true });

module.exports = mongoose.model('User',userSchema);