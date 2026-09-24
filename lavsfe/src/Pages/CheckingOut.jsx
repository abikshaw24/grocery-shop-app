import { useEffect, useState } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Image
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";

import API from "../Services/Api";

import "./Checkout.css";


function CheckOut() {

  const navigate = useNavigate();


  // =====================================
  // CART
  // =====================================

  const {
    cart,
    getCartTotal,
    clearCart
  } = useCart();


  // =====================================
  // CUSTOMER
  // =====================================

  const [customer, setCustomer] = useState(null);


  // =====================================
  // FORM DATA
  // =====================================

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    phone: "",
    address: ""

  });


  // =====================================
  // ERROR MESSAGE
  // =====================================

  const [error, setError] = useState("");


  // =====================================
  // LOADING
  // =====================================

  const [loading, setLoading] = useState(false);


  // =====================================
  // LOAD CUSTOMER
  // =====================================

  useEffect(() => {

    const savedCustomer =
      localStorage.getItem("customer");


    // CUSTOMER NOT REGISTERED
    if (!savedCustomer) {

      setError(
        "Please register before placing an order."
      );

      return;

    }


    try {

      const parsedCustomer =
        JSON.parse(savedCustomer);


      console.log(
        "CUSTOMER FROM LOCAL STORAGE:",
        parsedCustomer
      );


      // SAVE CUSTOMER
      setCustomer(parsedCustomer);


      // PUT CUSTOMER DETAILS INTO FORM
      setFormData({

        name:
          parsedCustomer.name || "",

        email:
          parsedCustomer.email || "",

        phone:
          parsedCustomer.phone || "",

        address:
          parsedCustomer.address || ""

      });

    } catch (error) {

      console.log(
        "CUSTOMER DATA ERROR:",
        error
      );


      setError(
        "Customer information is invalid. Please register again."
      );

    }

  }, []);


  // =====================================
  // HANDLE INPUT
  // =====================================

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;


    setFormData({

      ...formData,

      [name]: value

    });

  };


  // =====================================
  // SUBTOTAL
  // =====================================

  const subtotal = getCartTotal();


  // =====================================
  // DELIVERY CHARGE
  // =====================================

  const deliveryCharge =
    subtotal >= 500
      ? 0
      : 40;


  // =====================================
  // FINAL TOTAL
  // =====================================

  const totalAmount =
    subtotal + deliveryCharge;


  // =====================================
  // PLACE ORDER
  // =====================================

  const handlePlaceOrder = async (e) => {

    e.preventDefault();


    // CLEAR OLD ERROR
    setError("");


    // =====================================
    // CUSTOMER CHECK
    // =====================================

    if (!customer?._id) {

      setError(
        "Customer ID not found. Please register again."
      );

      return;

    }


    // =====================================
    // CART CHECK
    // =====================================

    if (cart.length === 0) {

      setError(
        "Your cart is empty."
      );

      return;

    }


    // =====================================
    // FORM VALIDATION
    // =====================================

    if (

      !formData.name.trim() ||

      !formData.email.trim() ||

      !formData.phone.trim() ||

      !formData.address.trim()

    ) {

      setError(
        "Please fill all delivery details."
      );

      return;

    }


    // =====================================
    // PHONE VALIDATION
    // =====================================

    if (!/^[0-9]{10}$/.test(formData.phone)) {

      setError(
        "Please enter a valid 10-digit phone number."
      );

      return;

    }


    // =====================================
    // CREATE ORDER PRODUCTS
    // =====================================

    const orderProducts = cart.map((item) => ({

      productId:
        item._id,

      name:
        item.name,

      price:
        Number(item.price),

      quantity:
        Number(item.quantity),

      total:
        Number(item.price) *
        Number(item.quantity)

    }));


    // =====================================
    // CREATE ORDER DATA
    // =====================================

    const orderData = {

      customerId:
        customer._id,

      customerName:
        formData.name.trim(),

      customerEmail:
        formData.email.trim(),

      customerPhone:
        formData.phone.trim(),

      deliveryAddress:
        formData.address.trim(),

      products:
        orderProducts,

      subtotal:
        subtotal,

      deliveryCharge:
        deliveryCharge,

      totalAmount:
        totalAmount

    };


    console.log(
      "================================"
    );

    console.log(
      "ORDER DATA SENT TO BACKEND:",
      orderData
    );

    console.log(
      "================================"
    );


    try {

      // =====================================
      // START LOADING
      // =====================================

      setLoading(true);


      // =====================================
      // SEND ORDER TO BACKEND
      // =====================================

      const response =
        await API.post(
          "/orders",
          orderData
        );


      console.log(
        "BACKEND RESPONSE:",
        response.data
      );
      
      const savedOrder = response.data.order;

localStorage.setItem("lastOrderId", savedOrder._id);
localStorage.setItem("lastOrder", JSON.stringify(savedOrder));

clearCart();

navigate("/order-success", {
  state: {
    orderId: savedOrder._id,
  },
});

return;
    


    } catch (error) {

      // =====================================
      // ORDER ERROR
      // =====================================

      console.log(
        "ORDER ERROR:",
        error
      );


      console.log(
        "BACKEND RESPONSE:",
        error.response?.data
      );


      setError(

        error.response?.data?.message ||

        "Unable to place order. Please try again."

      );

    } finally {

      // =====================================
      // STOP LOADING
      // =====================================

      setLoading(false);

    }

  };


  // =====================================
  // EMPTY CART
  // =====================================

  if (cart.length === 0) {

    return (

      <Container className="py-5">

        <div className="text-center">

          <h2>
            🛒 Your cart is empty
          </h2>


          <p className="text-muted">

            Add some fresh groceries
            before checking out.

          </p>


          <Button

            variant="success"

            onClick={() =>
              navigate("/products")
            }

          >

            Continue Shopping

          </Button>

        </div>

      </Container>

    );

  }


  // =====================================
  // CHECKOUT PAGE
  // =====================================

  return (

    <div className="checkout-page">

      <Container className="py-5">


        {/* =================================
            PAGE TITLE
        ================================= */}

        <div className="checkout-heading">

          <p>
            🌿 FARM ORGANIC STORE
          </p>

          <h1>
            🧾 Checkout
          </h1>

          <span>
            Complete your order details
          </span>

        </div>


        {/* =================================
            ERROR MESSAGE
        ================================= */}

        {error && (

          <Alert
            variant="danger"
            className="mb-4"
          >

            {error}

          </Alert>

        )}


        <Row className="g-4">


          {/* =================================
              CUSTOMER DETAILS
          ================================= */}

          <Col lg={7}>

            <Card
              className="shadow-sm checkout-card"
            >

              <Card.Body className="p-4">

                <h3 className="mb-4">

                  👤 Delivery Details

                </h3>


                <Form
                  onSubmit={handlePlaceOrder}
                >


                  {/* =========================
                      NAME
                  ========================= */}

                  <Form.Group
                    className="mb-3"
                  >

                    <Form.Label>
                      Full Name
                    </Form.Label>


                    <Form.Control

                      type="text"

                      name="name"

                      value={formData.name}

                      onChange={handleChange}

                      placeholder="Enter your name"

                      required

                    />

                  </Form.Group>


                  {/* =========================
                      EMAIL
                  ========================= */}

                  <Form.Group
                    className="mb-3"
                  >

                    <Form.Label>
                      Email
                    </Form.Label>


                    <Form.Control

                      type="email"

                      name="email"

                      value={formData.email}

                      onChange={handleChange}

                      placeholder="Enter your email"

                      required

                    />

                  </Form.Group>


                  {/* =========================
                      PHONE
                  ========================= */}

                  <Form.Group
                    className="mb-3"
                  >

                    <Form.Label>
                      Phone Number
                    </Form.Label>


                    <Form.Control

                      type="tel"

                      name="phone"

                      value={formData.phone}

                      onChange={handleChange}

                      maxLength={10}

                      placeholder="Enter 10-digit phone"

                      required

                    />

                  </Form.Group>


                  {/* =========================
                      ADDRESS
                  ========================= */}

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

                      value={formData.address}

                      onChange={handleChange}

                      placeholder="Enter your delivery address"

                      required

                    />

                  </Form.Group>


                  {/* =========================
                      PLACE ORDER BUTTON
                  ========================= */}

                  <Button

                    type="submit"

                    variant="success"

                    size="lg"

                    className="w-100"

                    disabled={loading}

                  >

                    {loading

                      ? "⏳ Placing Order..."

                      : "🛍️ Place Order"

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

            <Card
              className="shadow-sm checkout-card"
            >

              <Card.Body className="p-4">


                <h3 className="mb-4">

                  🛒 Your Order

                </h3>


                {/* =========================
                    PRODUCTS
                ========================= */}

                {cart.map((item) => (

                  <div

                    className="checkout-product"

                    key={item._id}

                  >


                    {/* PRODUCT IMAGE */}

                    <Image

                      src={
                        item.image ||
                        "https://images.unsplash.com/photo-1542838132-92c53300491e"
                      }

                      alt={item.name}

                      className="checkout-product-image"

                    />


                    {/* PRODUCT DETAILS */}

                    <div
                      className="flex-grow-1"
                    >

                      <h6>
                        {item.name}
                      </h6>


                      <small
                        className="text-muted"
                      >

                        ₹{item.price}

                        {" × "}

                        {item.quantity}

                      </small>

                    </div>


                    {/* PRODUCT TOTAL */}

                    <strong>

                      ₹
                      {
                        Number(item.price) *
                        Number(item.quantity)
                      }

                    </strong>


                  </div>

                ))}


                <hr />


                {/* =========================
                    SUBTOTAL
                ========================= */}

                <div className="checkout-row">

                  <span>
                    Subtotal
                  </span>


                  <strong>
                    ₹{subtotal}
                  </strong>

                </div>


                {/* =========================
                    DELIVERY
                ========================= */}

                <div className="checkout-row">

                  <span>
                    Delivery
                  </span>


                  <strong>

                    {deliveryCharge === 0

                      ? "FREE"

                      : `₹${deliveryCharge}`

                    }

                  </strong>

                </div>


                {/* FREE DELIVERY MESSAGE */}

                {subtotal > 0 &&
                  subtotal < 500 && (

                    <Alert
                      variant="info"
                      className="small mt-3"
                    >

                      Add ₹
                      {500 - subtotal}
                      {" "}more to get
                      <strong>
                        {" "}FREE delivery!
                      </strong>

                    </Alert>

                  )}


                <hr />


                {/* =========================
                    FINAL TOTAL
                ========================= */}

                <div className="checkout-total">

                  <span>
                    Total
                  </span>


                  <strong>
                    ₹{totalAmount}
                  </strong>

                </div>


                {/* =========================
                    SECURITY MESSAGE
                ========================= */}

                <div className="checkout-note">

                  🔒 Your order is securely
                  processed.

                </div>


              </Card.Body>

            </Card>

          </Col>

        </Row>

      </Container>

    </div>

  );

}


export default CheckOut;