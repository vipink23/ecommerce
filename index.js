const mongoose = require('mongoose');
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const port = 3001
mongoose.set('strictQuery', true)

//app.get('/', (req, res) => {
  //res.send('Hello World!')

//})
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
      console.log("connected");
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  }
  


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
main().catch(err => console.log(err));
app.use(express.json())
const productRouter= require('./Routes/productRoutes')
app.use('/product',productRouter)


