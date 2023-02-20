const Category = require("../../models/category")


function createCategories( categories,parentId=null ){
    const categoryList = [];

    let category;
    if(parentId==null){
        category = categories.filter( cat => cat.parentId == undefined );
    }else {
        category = categories.filter( cat => cat.parentId == parentId );
    }

    for (let cate of category ){
        categoryList.push({
            _id:cate.id,
            name:cate.name,
            slug:cate.slug,
            cateImage:cate.cateImage,
            children:createCategories(categories, cate._id)
        });
    }

    return categoryList;
}
const allCategory = async (req,res) => {
    const count = await Category.countDocuments();
    Category.find({})

        .exec((error,categories)=>{
            if(error) return res.status(500).json({message:"Something went wrong"});
            if(categories){
                const categoryList = createCategories(categories);
                res.status(200).json({
                    categoryList,
                    count: count,
                })
            }
        })
}
module.exports = allCategory;