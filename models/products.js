const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    discription:{
        type:String
    },
    brand:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }

})
module.exports =mongoose.model('products',productSchema)