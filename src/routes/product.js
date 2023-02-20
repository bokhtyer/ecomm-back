const express = require('express');
const CreateProduct = require('../controller/product/product');
const { requireSignIn,adminMiddleware }  = require('../common/index')

const router = express.Router();


const multer = require("multer");
const shortid = require("shortid");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + "-" + file.originalname);
    },
});

const upload = multer({ storage });




router.post("/product/create", requireSignIn, adminMiddleware,upload.array("productPicture"),CreateProduct);



module.exports = router;