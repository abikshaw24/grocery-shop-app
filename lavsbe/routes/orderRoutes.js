const express = require("express");

const router = express.Router();

const Order = require("../models/Order");

const Customer = require("../models/Customer");
// ==================================================
// PLACE NEW ORDER
// ==================================================

router.post("/", async (req, res) => {

  try {

    console.log("====================================");
    console.log("ORDER DATA RECEIVED");
    console.log(req.body);
    console.log("====================================");


    // ==========================================
    // GET DATA FROM FRONTEND
    // ==========================================

    const {
      customer,
      customerId,
      products,
      subtotal,
      deliveryCharge,
      totalAmount
    } = req.body;


    // ==========================================
    // CUSTOMER DETAILS
    // ==========================================

    const customerName =
      customer?.name ||
      req.body.customerName;

    const customerEmail =
      customer?.email ||
      req.body.customerEmail;

    const customerPhone =
      customer?.phone ||
      req.body.customerPhone;

    const deliveryAddress =
      customer?.address ||
      req.body.deliveryAddress;


    // ==========================================
    // BASIC VALIDATION
    // ==========================================

    if (!customerName) {

      return res.status(400).json({
        message: "Customer name is required"
      });

    }

    if (!customerEmail) {

      return res.status(400).json({
        message: "Customer email is required"
      });

    }

    if (!customerPhone) {

      return res.status(400).json({
        message: "Customer phone is required"
      });

    }

    if (!deliveryAddress) {

      return res.status(400).json({
        message: "Delivery address is required"
      });

    }

    if (
      !products ||
      !Array.isArray(products) ||
      products.length === 0
    ) {

      return res.status(400).json({
        message: "Cart is empty"
      });

    }


    // ==========================================
    // FIND CUSTOMER ID
    // ==========================================

    let finalCustomerId =
      customerId ||
      customer?._id;


    // If customerId is not coming from frontend,
    // find customer using email.

    if (!finalCustomerId) {

      const existingCustomer =
        await Customer.findOne({
          email: customerEmail
        });


      if (!existingCustomer) {

        return res.status(404).json({

          message:
            "Customer not found. Please register first."

        });

      }


      finalCustomerId =
        existingCustomer._id;

    }


    console.log(
      "CUSTOMER ID:",
      finalCustomerId
    );


    // ==========================================
    // PREPARE PRODUCTS
    // ==========================================

    const orderProducts =
      products.map((item) => {

        const price =
          Number(item.price || 0);

        const quantity =
          Number(item.quantity || 1);

        const total =
          price * quantity;


        return {

          productId:
            item.productId ||
            item._id,

          name:
            item.name,

          price:
            price,

          quantity:
            quantity,

          total:
            total

        };

      });


    console.log(
      "ORDER PRODUCTS:",
      orderProducts
    );


    // ==========================================
    // CREATE ORDER
    // ==========================================

    const newOrder =
      new Order({

        customerId:
          finalCustomerId,

        customerName:
          customerName,

        customerEmail:
          customerEmail,

        customerPhone:
          customerPhone,

        deliveryAddress:
          deliveryAddress,

        products:
          orderProducts,

        subtotal:
          Number(subtotal || 0),

        deliveryCharge:
          Number(deliveryCharge || 0),

        totalAmount:
          Number(totalAmount || 0),

        orderStatus:
          "Pending"

      });


    // ==========================================
    // SAVE ORDER
    // ==========================================

    const savedOrder =
      await newOrder.save();


    console.log("====================================");
    console.log("ORDER SAVED SUCCESSFULLY");
    console.log(savedOrder);
    console.log("====================================");


    // ==========================================
    // SEND RESPONSE
    // ==========================================

    return res.status(201).json({

      success: true,

      message:
        "Order placed successfully",

      order:
        savedOrder

    });


  } catch (error) {

    console.log(
      "===================================="
    );

    console.log(
      "ORDER CREATION ERROR:"
    );

    console.log(error);

    console.log(
      "===================================="
    );


    return res.status(500).json({

      success: false,

      message:
        "Order creation failed",

      error:
        error.message

    });

  }

});

// ==================================================
// GET ALL ORDERS - ADMIN
// ==================================================

router.get("/all", async (req, res) => {

  try {

    console.log(
      "ADMIN REQUESTED ALL ORDERS"
    );


    const orders =
      await Order.find()
        .sort({
          createdAt: -1
        });


    console.log(
      "ORDERS FOUND:",
      orders.length
    );


    return res.status(200).json({

      success: true,

      orders:
        orders

    });


  } catch (error) {

    console.log(
      "GET ALL ORDERS ERROR:",
      error
    );


    return res.status(500).json({

      success: false,

      message:
        "Unable to load orders",

      error:
        error.message

    });

  }

});


// ==================================================
// GET ORDERS OF ONE CUSTOMER
// ==================================================

router.get(
  "/customer/:customerId",
  async (req, res) => {

    try {

      const {
        customerId
      } = req.params;


      const orders =
        await Order.find({

          customerId:
            customerId

        }).sort({

          createdAt: -1

        });


      return res.status(200).json({

        success: true,

        orders:
          orders

      });


    } catch (error) {

      console.log(
        "CUSTOMER ORDERS ERROR:",
        error
      );


      return res.status(500).json({

        success: false,

        message:
          "Unable to load customer orders",

        error:
          error.message

      });

    }

  }
);


// ==================================================
// UPDATE ORDER STATUS
// ==================================================

router.put(
  "/:id/status",
  async (req, res) => {

    try {

      const {
        status
      } = req.body;


      console.log(
        "STATUS UPDATE REQUEST:"
      );

      console.log(
        "ORDER ID:",
        req.params.id
      );

      console.log(
        "NEW STATUS:",
        status
      );


      // ============================================
      // ALLOWED STATUS
      // ============================================

      const allowedStatuses = [

        "Pending",

        "Confirmed",

        "Preparing",

        "Out for Delivery",

        "Delivered"

      ];


      if (
        !allowedStatuses.includes(status)
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid order status"

        });

      }


      // ============================================
      // UPDATE
      // ============================================

      const updatedOrder =
        await Order.findByIdAndUpdate(

          req.params.id,

          {

            orderStatus:
              status

          },

          {

            new: true

          }

        );


      // ============================================
      // NOT FOUND
      // ============================================

      if (!updatedOrder) {

        return res.status(404).json({

          success: false,

          message:
            "Order not found"

        });

      }


      console.log(
        "ORDER STATUS UPDATED:"
      );

      console.log(
        updatedOrder
      );


      // ============================================
      // RESPONSE
      // ============================================

      return res.status(200).json({

        success: true,

        message:
          "Order status updated successfully",

        order:
          updatedOrder

      });


    } catch (error) {

      console.log(
        "STATUS UPDATE ERROR:",
        error
      );


      return res.status(500).json({

        success: false,

        message:
          "Unable to update order status",

        error:
          error.message

      });

    }

  }
);


// ==================================================
// GET ONE ORDER
// ==================================================

router.get("/:id", async (req, res) => {

  try {

    const order =
      await Order.findById(
        req.params.id
      );


    if (!order) {

      return res.status(404).json({

        success: false,

        message:
          "Order not found"

      });

    }


    return res.status(200).json({

      success: true,

      order:
        order

    });


  } catch (error) {

    console.log(
      "GET ONE ORDER ERROR:",
      error
    );


    return res.status(500).json({

      success: false,

      message:
        "Unable to load order",

      error:
        error.message

    });

  }

});


// ==================================================
// EXPORT ROUTER
// ==================================================

module.exports = router;