import mongoose from 'mongoose'

const orderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
    },
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "cartProduct",
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "shipped", "delivered"],
        default: "pending",
      },

    paymentMethod: {
        type: String,
        required: true,
        enum: [ "paypal"],
      },

      shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      orderTotal: {
        type: Number,
        required: true,
      },
})

const OrderModel=mongoose.model('order', orderSchema)
export default OrderModel