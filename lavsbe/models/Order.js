const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true
    },

    customerName: {
      type: String,
      required: true
    },

    customerEmail: {
      type: String,
      required: true
    },

    customerPhone: {
      type: String,
      required: true
    },

    deliveryAddress: {
      type: String,
      required: true
    },

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },

        name: {
          type: String,
          required: true
        },

        price: {
          type: Number,
          required: true
        },

        quantity: {
          type: Number,
          required: true
        },

        total: {
          type: Number,
          required: true
        }
      }
    ],

    subtotal: {
      type: Number,
      required: true
    },

    deliveryCharge: {
      type: Number,
      required: true
    },

    totalAmount: {
      type: Number,
      required: true
    },

    orderStatus: {
      type: String,
      enum: [
      "Pending",
      "Confirmed",
      "Packed",
      "Out for Delivery",
      "Delivered",
      "Cancelled"
    ],
  default: "Confirmed"
}
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model(
  "Order",
  orderSchema
);

module.exports = Order;