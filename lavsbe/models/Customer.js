const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    phone: {
      type: String,
      required: true,
      trim: true
    },

    address: {
      type: String,
      required: true,
      trim: true
    },

     message: 
     { type: String,
       default: "" }
  },
  {
    timestamps: true
  }
);

const Customer = mongoose.model(
  "Customer",
  customerSchema
);

module.exports = Customer;