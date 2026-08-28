import { useState } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";

import API from "../Services/Api";

import "./Billing.css";


function Billing() {

  const navigate = useNavigate();

  // ==========================================
  // CART
  // ==========================================

  const {
    cart,
    clearCart
  } = useCart();


  // ==========================================
  // CUSTOMER FROM LOCAL STORAGE
  // ==========================================

  let savedCustomer = null;

  try {

    savedCustomer =
      JSON.parse(
        localStorage.getItem("customer")
      );

  } catch (error) {

    console.log(
      "Customer localStorage error:",
      error
    );

  }


  // ==========================================
  // CUSTOMER STATE
  // ==========================================

  const [customer, setCustomer] = useState({

    name:
      savedCustomer?.name || "",

    email:
      savedCustomer?.email || "",

    phone:
      savedCustomer?.phone || "",

    address:
      savedCustomer?.address || ""

  });


  const [loading, setLoading] =
    useState(false);


  const [message, setMessage] =
    useState("");


  const [error, setError] =
    useState("");


  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;


    setCustomer(
      (previousCustomer) => ({

        ...previousCustomer,

        [name]: value

      })
    );

  };


  // ==========================================
  // SUBTOTAL
  // ==========================================

  const subtotal = cart.reduce(

    (total, item) => {

      return (
        total +
        Number(item.price || 0) *
        Number(item.quantity || 0)
      );

    },

    0

  );


  // ==========================================
  // DELIVERY
  // ==========================================

  const deliveryCharge =
    subtotal >= 500
      ? 0
      : 40;


  // ==========================================
  // GRAND TOTAL
  // ==========================================

  const grandTotal =
    subtotal + deliveryCharge;


  // ==========================================
  // PLACE ORDER
  // ==========================================

  const handlePlaceOrder = async (e) => {

    e.preventDefault();

    setMessage("");

    setError("");


    // ========================================
    // VALIDATE CUSTOMER
    // ========================================

    if (!customer.name.trim()) {

      setError(
        "Please enter your full name."
      );

      return;

    }


    if (!customer.email.trim()) {

      setError(
        "Please enter your email."
      );

      return;

    }


    if (!customer.phone.trim()) {

      setError(
        "Please enter your phone number."
      );

      return;

    }


    if (!customer.address.trim()) {

      setError(
        "Please enter your delivery address."
      );

      return;

    }


    // ========================================
    // VALIDATE CART
    // ========================================

    if (!cart || cart.length === 0) {

      setError(
        "Your cart is empty. Please add products before placing an order."
      );

      return;

    }


    try {

      setLoading(true);


      // ======================================
      // ORDER DATA
      // ======================================

      const orderData = {

        customer: {

          name:
            customer.name.trim(),

          email:
            customer.email.trim(),

          phone:
            customer.phone.trim(),

          address:
            customer.address.trim()

        },


        products: cart.map(
          (item) => ({

            productId:
              item._id,

            name:
              item.name,

            price:
              Number(item.price),

            quantity:
              Number(item.quantity),

            image:
              item.image || ""

          })
        ),


        subtotal:
          Number(subtotal),


        deliveryCharge:
          Number(deliveryCharge),


        totalAmount:
          Number(grandTotal),


        status:
          "Pending"

      };


      console.log(
        "================================"
      );

      console.log(
        "ORDER DATA SENT TO BACKEND:"
      );

      console.log(
        orderData
      );

      console.log(
        "================================"
      );


      // ======================================
      // SEND ORDER
      // ======================================

      const response =
        await API.post(
          "/orders",
          orderData
        );


      console.log(
        "BACKEND RESPONSE:"
      );

      console.log(
        response.data
      );


      // ======================================
      // GET CREATED ORDER
      // ======================================

      const createdOrder =
        response.data?.order ||
        response.data;


      // ======================================
      // SAVE CUSTOMER
      // ======================================

      localStorage.setItem(
        "customer",
        JSON.stringify(customer)
      );


      // ======================================
      // SAVE LAST ORDER
      // ======================================

      localStorage.setItem(
        "lastOrder",
        JSON.stringify(
          createdOrder
        )
      );


      // ======================================
      // CLEAR CART
      // ======================================

      clearCart();


      // ======================================
      // SUCCESS
      // ======================================

      setMessage(
        "🎉 Order placed successfully!"
      );


      // ======================================
      // GO TO SUCCESS PAGE
      // ======================================

      setTimeout(() => {

        navigate(
          "/order-success"
        );

      }, 1000);


    } catch (error) {

      console.log(
        "================================"
      );

      console.log(
        "ORDER ERROR:"
      );

      console.log(
        error
      );

      console.log(
        "BACKEND ERROR:"
      );

      console.log(
        error.response?.data
      );

      console.log(
        "================================"
      );


      setError(

        error.response?.data?.message ||

        "Unable to place order. Please try again."

      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="billing-page">


      {/* =====================================
          HERO
      ===================================== */}

      <section className="billing-hero">

        <Container>

          <div className="billing-hero-content">

            <span>
              💳 CHECKOUT
            </span>

            <h1>
              Final Billing
            </h1>

            <p>
              Almost there! Complete
              your order below.
            </p>

          </div>

        </Container>

      </section>


      {/* =====================================
          CONTENT
      ===================================== */}

      <Container className="py-5">


        {/* SUCCESS */}

        {message && (

          <Alert variant="success">

            {message}

          </Alert>

        )}


        {/* ERROR */}

        {error && (

          <Alert variant="danger">

            {error}

          </Alert>

        )}


        <Row className="g-4">


          {/* =================================
              CUSTOMER DETAILS
          ================================= */}

          <Col lg={7}>

            <Card className="billing-card">

              <Card.Body>

                <h3>
                  👤 Delivery Details
                </h3>

                <p className="billing-subtitle">

                  Where should we deliver
                  your groceries?

                </p>


                <Form
                  onSubmit={
                    handlePlaceOrder
                  }
                >


                  {/* NAME */}

                  <Form.Group
                    className="mb-3"
                  >

                    <Form.Label>
                      Full Name
                    </Form.Label>

                    <Form.Control

                      type="text"

                      name="name"

                      placeholder="Enter your name"

                      value={
                        customer.name
                      }

                      onChange={
                        handleChange
                      }

                    />

                  </Form.Group>


                  {/* EMAIL */}

                  <Form.Group
                    className="mb-3"
                  >

                    <Form.Label>
                      Email
                    </Form.Label>

                    <Form.Control

                      type="email"

                      name="email"

                      placeholder="Enter your email"

                      value={
                        customer.email
                      }

                      onChange={
                        handleChange
                      }

                    />

                  </Form.Group>


                  {/* PHONE */}

                  <Form.Group
                    className="mb-3"
                  >

                    <Form.Label>
                      Phone Number
                    </Form.Label>

                    <Form.Control

                      type="tel"

                      name="phone"

                      placeholder="Enter your phone number"

                      value={
                        customer.phone
                      }

                      onChange={
                        handleChange
                      }

                    />

                  </Form.Group>


                  {/* ADDRESS */}

                  <Form.Group
                    className="mb-4"
                  >

                    <Form.Label>
                      Delivery Address
                    </Form.Label>

                    <Form.Control

                      as="textarea"

                      rows={4}

                      name="address"

                      placeholder="Enter your complete delivery address"

                      value={
                        customer.address
                      }

                      onChange={
                        handleChange
                      }

                    />

                  </Form.Group>


                  {/* PLACE ORDER */}

                  <Button

                    type="submit"

                    className="place-order-button"

                    disabled={loading}

                  >

                    {loading

                      ? "Placing Order..."

                      : "🛒 Place Order"

                    }

                  </Button>


                </Form>

              </Card.Body>

            </Card>

          </Col>


          {/* =================================
              ORDER SUMMARY
          ================================= */}

          <Col lg={5}>

            <Card className="billing-summary">

              <Card.Body>

                <h3>
                  🧾 Order Summary
                </h3>


                {/* PRODUCTS */}

                <div className="billing-products">

                  {cart.map(
                    (item) => (

                      <div

                        className="billing-product"

                        key={
                          item._id
                        }

                      >

                        <div>

                          <strong>
                            {item.name}
                          </strong>

                          <small>

                            {item.quantity}

                            {" × "}

                            ₹

                            {Number(
                              item.price
                            ).toFixed(2)}

                          </small>

                        </div>


                        <strong>

                          ₹

                          {(
                            Number(
                              item.price
                            ) *
                            Number(
                              item.quantity
                            )
                          ).toFixed(2)}

                        </strong>

                      </div>

                    )
                  )}

                </div>


                <hr />


                {/* SUBTOTAL */}

                <div className="billing-row">

                  <span>
                    Subtotal
                  </span>

                  <strong>

                    ₹
                    {subtotal.toFixed(2)}

                  </strong>

                </div>


                {/* DELIVERY */}

                <div className="billing-row">

                  <span>
                    Delivery
                  </span>

                  <strong>

                    {deliveryCharge === 0

                      ? "FREE"

                      : `₹${deliveryCharge.toFixed(2)}`

                    }

                  </strong>

                </div>


                <hr />


                {/* TOTAL */}

                <div className="billing-total">

                  <span>
                    Total
                  </span>

                  <strong>

                    ₹
                    {grandTotal.toFixed(2)}

                  </strong>

                </div>


                {/* FREE DELIVERY */}

                {subtotal >= 500 && (

                  <Alert

                    variant="success"

                    className="mt-3"

                  >

                    🎉 You received

                    <strong>
                      {" "}FREE delivery!
                    </strong>

                  </Alert>

                )}

              </Card.Body>

            </Card>

          </Col>

        </Row>

      </Container>

    </div>

  );

}


export default Billing;