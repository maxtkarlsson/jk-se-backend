const Product = require("../models/Product");
const { NotFoundError } = require("../utils/errors");

exports.getAllProducts = async (req, res) => {
  try {
    const page = Number(req.query?.page || 1);

    const pageSize = Number(req.query?.limit || 6);

    const skip = (page - 1) * pageSize;

    const totalProductsInDatabase = await Product.countDocuments();

    const pages = Math.ceil(totalProductsInDatabase / pageSize);

    const products = await Product.find().skip(skip).limit(pageSize);

    if (page > pages) {
      return res.status(404).json({
        status: "fail",
        message: "No page found",
      });
    }

    return res.status(200).json({
      products: products,
      meta: {
        status: "success",
        total: totalProductsInDatabase,
        count: products.length,
        page: page,
        pages: pages,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Server Error" });
  }
};

exports.getProductById = async (req, res) => {
  const productId = req.params.productId;

  const product = await Product.findById(productId);

  if (!product)
    throw new NotFoundError("A product with that ID does not exist");

  return res.status(200).json(product);
};
