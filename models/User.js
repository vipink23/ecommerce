import mongoose from "mongoose";
const addressSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      mobileNumber: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
      locality: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      

})
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  address: [addressSchema],
});
const UserModel = mongoose.model("user", userSchema);
export default UserModel;
