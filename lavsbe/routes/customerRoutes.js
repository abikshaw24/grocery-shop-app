const express = require("express");

const Customer = require("../models/Customer");

const router = express.Router();


// ==================================================
// REGISTER / GET EXISTING CUSTOMER
// ==================================================

router.post("/register", async (req, res) => {

  try {

    const {
      name,
      email,
      phone,
      address
    } = req.body;


    console.log(
      "CUSTOMER REGISTRATION DATA:",
      req.body
    );


    // ==================================================
    // VALIDATION
    // ==================================================

    if (
      !name ||
      !email ||
      !phone ||
      !address
    ) {

      return res.status(400).json({

        message:
          "All fields are required"

      });

    }


    // ==================================================
    // CHECK EXISTING CUSTOMER
    // ==================================================

    const existingCustomer =
      await Customer.findOne({
        email: email.trim().toLowerCase()
      });


    // ==================================================
    // CUSTOMER ALREADY EXISTS
    // ==================================================

    if (existingCustomer) {

      console.log(
        "EXISTING CUSTOMER FOUND:",
        existingCustomer
      );


      return res.status(200).json({

        message:
          "Customer already registered",

        customer:
          existingCustomer

      });

    }


    // ==================================================
    // CREATE NEW CUSTOMER
    // ==================================================

    const customer =
      new Customer({

        name:
          name.trim(),

        email:
          email.trim().toLowerCase(),

        phone:
          phone.trim(),

        address:
          address.trim()

      });


    // ==================================================
    // SAVE CUSTOMER
    // ==================================================

    const savedCustomer =
      await customer.save();


    console.log(
      "NEW CUSTOMER SAVED:",
      savedCustomer
    );


    // ==================================================
    // RESPONSE
    // ==================================================

    return res.status(201).json({

      message:
        "Customer registered successfully",

      customer:
        savedCustomer

    });


  } catch (error) {

    console.log(
      "CUSTOMER REGISTRATION ERROR:",
      error
    );


    return res.status(500).json({

      message:
        "Server error",

      error:
        error.message

    });

  }

});


// ==================================================
// GET CUSTOMER BY ID
// ==================================================

router.get("/:id", async (req, res) => {

  try {

    const customer =
      await Customer.findById(
        req.params.id
      );


    if (!customer) {

      return res.status(404).json({

        message:
          "Customer not found"

      });

    }


    res.status(200).json({

      success: true,

      customer:
        customer

    });


  } catch (error) {

    console.log(
      "GET CUSTOMER ERROR:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Unable to get customer",

      error:
        error.message

    });

  }

});

// ==================================================
// CONTACT MESSAGE
// ==================================================

router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const contact = new Customer({
      name,
      email,
      phone: "N/A",
      address: "Contact Form",
      message,
    });

    await contact.save();

    res.status(201).json({
      message: "Contact message saved successfully",
    });
  } catch (error) {
    console.log("CONTACT ERROR:", error);

    res.status(500).json({
      message: "Unable to save contact message",
    });
  }
});
module.exports = router;