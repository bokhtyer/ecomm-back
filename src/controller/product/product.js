const Product = require("../../models/product")
const slugify = require("slugify");
/*
* Create Product
* */
const  createProduct  = (req,res) => {

    const {name,price,description,quantity,category} = req.body;

    let product_image = [];

    if(req.files.length > 0){
        product_image = req.files.map(file=>{
            return { img: file.filename }
        });
    }

    const product = new Product({
        name:name,
        slug:slugify(name),
        price,
        description,
        quantity,
        product_image,
        category,
        createdBy:req.user.id
    });

    product.save(((error,product)=>{
        if(error) return res.status(400).json({
            error
        })
        if(product){
            res.status(201).json({
                product,
                message:"Product created successfully"
            })
        }
    }));
}
module.exports = createProduct;