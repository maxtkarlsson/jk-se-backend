require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../src/models/Product.js");
const { mockProductData } = require("./products");

const populateDbWithMockData = async (connectionString) => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(connectionString);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    await Product.deleteMany();

    await Product.create(mockProductData);

    console.log("Database successfully populated with test data");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
};

populateDbWithMockData(process.env.MONGODB_URI);
