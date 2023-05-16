const express = require("express");
const router = express.Router();
const Products = require("../models/products");

router.get("/", async (req, res) => {
  try {
    // const { cat, brand, type } = req.query;
    // const query = { categories: cat, brand: brand, type: type };

    // if (brand === "All") {
    //   delete query["brand"];
    // } else {
    //   query.brand = brand;
    // }
    // console.log(cat, brand, type);
    const categories = req.query.categories;
    const products = await Products.find({categories:categories});
    // const products=await Products.find();
    // console.log(products,'products');
    res.json(products);
  } catch (err) {
    res.send("error" + err);
  }
});

// router.get("/", async (req, res) => {
//   try {
//     const product = await Products.find();
//     res.json(product);
//   } catch (err) {
//     res.send("Error ");
//   }
// });

// router.get("/", async (req, res) => {
//   try {
//     const product = await Products.find();
//     res.json(product);
//   } catch (err) {
//     res.send("error ");
//   }
// });

router.get("/:id", async (req, res) => {
  try {
    const product = await Products.findById(req.params.id).populate(
      "categories"
    );
    console.log(product);
    res.json(product);
  } catch (err) {
    console.log(err.message);
    res.send("Errorrrrrr ");
  }
});

router.post("/", async (req, res) => {
  const product = new Products({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    categories: req.body.categories,
    brand: req.body.brand,
    color: req.body.color,
    price: req.body.price,
  });
  try {
    const a1 = await product.save();
    res.json(a1);
    console.log(a1);
  } catch (err) {
    res.send("Error");
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const product = await Products.findByIdAndUpdate(req.params.id, req.body);
    res.json(product);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
