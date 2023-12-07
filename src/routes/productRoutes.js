const express = require("express");
const { getAllProducts } = require("../controllers/productController");
const router = express.Router();

// GET - /api/v1/bookings
router.get("/", getAllProducts);

module.exports = router;