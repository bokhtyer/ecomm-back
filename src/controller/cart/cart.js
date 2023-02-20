const Cart = require("../../models/cart")

const cartProduct  = (req,res) => {

    Cart.findOne({ user: req.user.id })
        .exec(( error,cart ) => {
            if(error) return res.status(400).json({ error });
            if(cart){
                /*
                * if cart.js already exit then update the cart.js quantity
                * */
                req.body.cart_items.forEach((cartItem) => {
                    const product = cartItem.product;
                    const item = cart?.cart_items.find( c => c.product == product );
                    let condition, update;
                    if(item){
                        condition = { "user": req.user.id,"cart_items.product":product }
                        update = {
                            "$set":{
                                "cart_items.$": {
                                    ...cartItem,
                                    quantity: item.quantity + cartItem.quantity,
                                }
                            }
                        };
                    }else{
                        condition = { user: req.user.id }
                        update = {
                            "$push":{
                                "cart_items":req.body.cart_items
                            }
                        };
                    }
                    Cart.findOneAndUpdate(condition,update)
                        .exec((error,_cart)=>{
                            if(error) return res.status(400).json({error})
                            if(_cart){
                                res.status(201).json({
                                    cart:_cart,
                                    message:"Cart Updated successfully"
                                })
                            }
                        })
                })
            }else{
                /*
                * if cart.js not exit then create a new cart.js
                * */
                const cart = new Cart ({
                    user:req.user.id,
                    cart_items:req.body.cart_items
                });
                cart.save((error,cart)=>{
                    if(error) return res.status(400).json({
                        message:"Something went wrong !"
                    })
                    if(cart){
                        return res.status(201).json({
                            cart,
                            message:"Cart added successfully"
                        })
                    }
                });
            }
        });
}
module.exports = cartProduct;