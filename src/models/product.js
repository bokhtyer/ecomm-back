const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    slug:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true
    },
    discount_price:{
        type:Number,
    },
    description:{
        type:String,
        trim:true
    },
    product_image:[
        { img:{ type:String } }
    ],
    quantity:{
        type:Number,
        required:true,
    },
    reviews:[
        {
            userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
            review: String
        }
    ],
    category:{
        type: mongoose.Schema.Types.ObjectId, ref:"Category",
        required:true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    updatedAt:Date,
},{ timestamps:true });

module.exports = mongoose.model('Product',productSchema);