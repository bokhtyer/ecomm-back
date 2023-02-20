const express = require('express');
const addItemToCart = require('../controller/cart/cart');
const { requireSignIn,userMiddleware }  = require('../common/index')

const router = express.Router();


router.post("/cart/add-to-cart", requireSignIn, userMiddleware,addItemToCart);



module.exports = router;