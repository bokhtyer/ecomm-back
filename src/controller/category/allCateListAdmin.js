const Category = require("../../models/category")

const allCateListAdmin = async (req,res) => {
    Category.find({})
        .exec((error,categories)=>{
            if(error) return res.status(500).json({message:"Something went wrong"});
            if(categories){
                res.status(200).json({
                    categories,
                })
            }
        })
}

module.exports = allCateListAdmin;