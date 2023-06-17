import mongoose from "mongoose";
import express from "express";
import ProductRouter from "./Routes/productRoutes.js";
import categoryRouter from "./Routes/categoryRoutes.js";
import userRouter from "./Routes/userRouter.js";
import cartRouter from "./Routes/cartRoutes.js";
const app = express();
import cors from "cors";
app.use(cors());
mongoose.set("strictQuery", true);
import dotenv from "dotenv";
dotenv.config();

const port = 3001;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
main().catch((err) => console.log(err));
app.use(express.json());
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
  console.log("connected");
}

app.use("/products", ProductRouter);
app.use("/category", categoryRouter);
app.use("/user", userRouter);
app.use("/cart", cartRouter);
app.use('/address',userRouter)
