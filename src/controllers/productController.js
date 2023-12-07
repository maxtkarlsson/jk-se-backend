const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();

  return res.json(products);
};
