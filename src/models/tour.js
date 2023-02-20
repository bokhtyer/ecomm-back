const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:200
    },
    description:{
        type:String,
        required:true,
        trim:true,
        min:3
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    creator:String,
    tags:[String],
    imageFile:String,
    createdAt:{
        type:Date,
        default: new Date(),
    },
    likeCount:{
        type:Number,
        default: 0
    }
});
module.exports = mongoose.model('Tour',tourSchema);