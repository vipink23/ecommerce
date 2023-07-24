import mongoose from "mongoose";

const connectDb= async ()=>{
  try {
    const connection= await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
    console.log('Db is connected');
  } catch (error) {
    console.log('db is not connected');
  }
}

export default connectDb