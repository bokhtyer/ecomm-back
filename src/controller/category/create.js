const Category = require("../../models/category")
const slugify = require("slugify");


/*
* Category Create
* */
const createCategory = async (req,res) => {

    const categoryObj = {
        name:req.body.name,
        slug:slugify(req.body.name)
    }

    if(req.file){
        categoryObj.cateImage = 'public/' + req.file.filename;
    }

    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId;
    }
    // const oldcheck = Category.findOne({name:req.body.name})



    const cat = new Category(categoryObj);


    cat.save((error,category)=>{

        if(error) return res.status(500).json({message:"Category already exit"});
        if(category){

            return res.status(201).json({
                category,
                message:"Category created successfully"
            });
        }
    })


}
module.exports = createCategory;


