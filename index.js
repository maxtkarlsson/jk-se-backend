require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./src/routes/productRoutes");

const app = express();
const PORT = 4000;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Processing ${req.method} request to ${req.path}`);
  next();
});

app.use("/api/v1/products", productRoutes);

async function run() {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
run();

module.exports = app;
