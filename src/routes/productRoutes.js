const express = require("express");
const {
  getAllProducts,
  getProductById,
} = require("../controllers/productController");
const router = express.Router();

// GET - /api/v1/products
router.get("/", getAllProducts);

// GET - /api/v1/products/:productId
router.get("/:productId", getProductById);

module.exports = router;
