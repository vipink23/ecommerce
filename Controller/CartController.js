import CartModel from "../models/Cartproduct.js";

// Controller function for creating a cart item
const CartItem = async (req, res) => {
  try {
    const { user, cartItem, subtotal } = req.body;
    console.log(cartItem);
    console.log(user,'userrrrrrrrrrr');
    const cartlist = await CartModel.findOne({user });
    if(cartlist){
      cartlist.cartItem=cartItem;
      cartlist.subtotal=subtotal;
      await cartlist.save()
    }else{
      const cart = await CartModel.create({
        user,
        cartItem,
        subtotal,
      });
      if (cart) {
        res.json(cart);
      } else {
        res.json({ message: "Failed to create cart item" });
      }
    }
   
  } catch (error) {
    res.send({ message: "Internal server error" });
  }
};



const getCartItems = async (req, res) => {
  try {
    const cart = await CartModel.find(req.params.id);
    res.json(cart);
    console.log(cart, "cartitemss");
  } catch (error) {
    res.send("error", error);
  }
};
export default { CartItem, getCartItems };
