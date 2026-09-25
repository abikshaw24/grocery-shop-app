const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

const productRoutes = require("./routes/productRoutes");

const orderRoutes = require("./routes/orderRoutes");

const customerRoutes = require("./routes/customerRoutes");
// Middleware
const allowedOrigins = [
  "https://grocery-a.netlify.app",
  "http://localhost:5173"
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());


// Test route
app.get("/", (req, res) => {
  res.send("Grocery Shop Backend is Running");
});


app.use("/api/products", productRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error);
  });