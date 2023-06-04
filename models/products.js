import mongoose from "mongoose"

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    categories:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    }],
   

    brand:{
        type:String,
        required:true

    },

    color:{
        type:String,
        required:true

    },
    
    price:{
        type:Number,
        required:true
    }

})

const ProductModel=mongoose.model('products', productSchema)
export default ProductModel