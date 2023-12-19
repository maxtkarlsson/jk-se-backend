require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const productRoutes = require("./src/routes/productRoutes");
const requestRoutes = require("./src/routes/requestRoutes");
const { errorMiddleware } = require("./src/middleware/errorMiddleware");
const { notFoundMiddleware } = require("./src/middleware/notFoundMiddleware");

const app = express();
const PORT = 4000;

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://jk-se.vercel.app/"],
    methods: ["GET", "PUT", "POST", "DELETE"],
  })
);

app.use((req, res, next) => {
  console.log(`Processing ${req.method} request to ${req.path}`);
  next();
});

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/requests", requestRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

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
