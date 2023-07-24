import mongoose from "mongoose";
import express from "express";
import ProductRouter from "./Routes/productRoutes.js";
import categoryRouter from "./Routes/categoryRoutes.js";
import userRouter from "./Routes/userRouter.js";
import cartRouter from "./Routes/cartRoutes.js";
import orderRouter from './Routes/OrderRoutes.js'
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./Config/Db.js";


// import AdminModel from './models/Admin.js'
// import bcrypt from 'bcrypt'

const app = express();
app.use(express.json());
app.use(cors());
mongoose.set("strictQuery", true);
dotenv.config();

connectDb()


app.use("/products", ProductRouter);
app.use("/category", categoryRouter);
app.use("/user", userRouter);
app.use("/cart", cartRouter);
app.use('/address',userRouter)
app.use('/order',orderRouter)




  //  const addadmin =  async() => {
  //  let password = "123456"
  
  //  let salt = await bcrypt.genSalt(10)
  //  let pass = await bcrypt.hash(password, salt)
  //  let email = "admin@gmail.com"
  //  await AdminModel.insertMany({
  //    email:email,
  //     password:pass,
  
  //   })
  //  }
  //  addadmin()




const port = 3001;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});