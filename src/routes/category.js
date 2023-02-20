const express = require('express');
const addCategory = require('../controller/category/create');
const getCategories = require('../controller/category/allCateListAdmin')
const getCategoriesUser = require('../controller/category/allcategory')
const { requireSignIn,adminMiddleware }  = require('../common/index')

const router = express.Router();

const shortid = require("shortid");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + "-" + file.originalname);
    },
});

const upload = multer({ storage });


router.post("/category/create", requireSignIn, adminMiddleware,upload.single("cateImage"),addCategory);
router.get("/category/all-cate-admin", getCategories);
router.get("/category/all-cate-user", getCategoriesUser);



module.exports = router;