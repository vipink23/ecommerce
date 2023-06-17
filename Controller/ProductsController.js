import ProductModel from "../models/products.js";

const ProductGet = async (req, res) => {
  try {
    const categories = req.query.categories;
    const products = await ProductModel.find({ categories: categories });
    res.json(products);
  } catch (err) {
    res.send("error" + err);
  }
};

const ProductGetById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id).populate(
      "categories"
    );
    // console.log(product);
    res.json(product);
  } catch (err) {
    console.log(err.message);
    res.send("Errorrrrrr ");
  }
};

const ProductPost = async (req, res) => {
  const product = new ProductModel({
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
};

const ProductPatch = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.json(product);
  } catch (err) {
    res.send(err.message);
  }
};

export default { ProductGet, ProductGetById, ProductPost, ProductPatch };
