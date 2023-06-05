// import CartModel from "../models/Cartproduct.js";

// const cartItem = async (req, res) => {
//   try {
//     const { user, cartItem, product, quantity, total, subtotal } = req.body;
//     const cart = await CartModel.create({
//       user,
//       cartItem,
//       product,
//       quantity,
//       total,
//       subtotal,
//     });
//     if (cart) {
//       res.json(cart);
//     } else {
//       res.send("cart is empty");
//     }
//   } catch (error) {
//     res.send("err" + error);
//   }
// };



import CartModel from '../models/Cartproduct.js';

// Controller function for creating a cart item
export const CartItem = async (req, res) => {
  try {
    const { user, cartItem, subtotal } = req.body;

    const cart = await CartModel.create({
      user,
      cartItem,
      subtotal,
    });

    if (cart) {
      return res.json(cart);
    } else {
      return res.status(400).json({ message: 'Failed to create cart item' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
export default { CartItem };