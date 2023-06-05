import mongoose from "mongoose";

const cartSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
    },
    cartItem:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
        ref:'product'

        },
        quantity:{
            type:Number,
            default:1,
            min:1,
        },
        total:{
            type:Number
        }
    }],

    subtotal:{
        type:Number
    }

})

const CartModel= mongoose.model('cartProduct',cartSchema)
export default CartModel