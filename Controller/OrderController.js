// import OrderModel from '../models/OrderDetail.js'
// import CartModel from '../models/Cartproduct.js'

// const OrderItems= async (req,res)=>{
//     try {
//         const {userId,orderTotal}=req.body;
//         const addressIndex = 0; 

//         const cart= await CartModel.findOne({user:userId})
//         if(!cart){
//             return res.status(401).json('Cart is empty');
//         }
//         const cartId=cart._id
//         const shippingAddressId = cart.user.address[addressIndex]._id;
//         const OrderDetails= new OrderModel({
//             user:userId,
//             cart:cartId,
//             shippingAddress:shippingAddressId,
//             orderTotal:orderTotal,
//             paymentMethod:"paypal",
//             status:"pending"
//         })

//         const savedOrder = await OrderDetails.save();
//         // res.status(200)
//         res.json(savedOrder)
        
//     } catch (error) {
//         res.send(error,'errorrrr')
//     }
// }

// export default {OrderItems}


import OrderModel from '../models/OrderDetail.js';
import CartModel from '../models/Cartproduct.js';

const OrderItems = async (req, res) => {
  try {
    const { userId, orderTotal, shippingAddress,paymentMethod, status } = req.body;
    console.log(req.body,'reqbody');
    console.log(shippingAddress,'shippingggg');

    const cart = await CartModel.findOne({ user: userId }).populate('user','address');

    // console.log(cart.user.address,'addresssssssss');

    if (!cart) {
      return res.status(401).json('Cart is empty');
    }
    if (!cart.user || !cart.user.address || cart.user.address.length === 0) {
      return res.status(400).json('User address not found');
    }
    
    const cartId = cart._id;
    const selectedAddress = cart.user.address.find(address => address._id.toString() === shippingAddress);
    console.log(selectedAddress,'select');

   
    
    if (!selectedAddress) {
      return res.status(400).json('Selected address not found');
    }
    
    const shippingAddressId = selectedAddress._id;
    console.log(shippingAddressId,'idssss');

    const OrderDetails = new OrderModel({
      user: userId,
      cart: cartId,
      shippingAddress: shippingAddressId,
      orderTotal: orderTotal,
      paymentMethod: paymentMethod,
      status: status
    });

    const savedOrder = await OrderDetails.save();
    res.json(savedOrder);
    console.log(savedOrder, 'saved orders');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred');
  }
};

export default  { OrderItems }
