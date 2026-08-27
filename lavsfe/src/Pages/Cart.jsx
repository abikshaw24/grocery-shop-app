import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";

import "./Cart.css";


function Cart() {

  const navigate = useNavigate();

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
  } = useCart();


  // ==========================================
  // SUBTOTAL
  // ==========================================

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price) *
      Number(item.quantity),

    0
  );


  // ==========================================
  // DELIVERY CHARGE
  // ==========================================

  const deliveryCharge =
    subtotal === 0
      ? 0
      : subtotal >= 500
        ? 0
        : 40;


  // ==========================================
  // GRAND TOTAL
  // ==========================================

  const grandTotal =
    subtotal + deliveryCharge;


  // ==========================================
  // EMPTY CART
  // ==========================================

  if (cart.length === 0) {

    return (

      <div className="cart-page">

        <Container>

          <div className="empty-cart">

            <div className="empty-cart-icon">
              🛒
            </div>

            <h2>
              Your Cart is Empty
            </h2>

            <p>
              Looks like you haven't
              added anything yet.
            </p>

            <Button
              variant="success"
              onClick={() =>
                navigate("/products")
              }
            >
              🛍️ Start Shopping
            </Button>

          </div>

        </Container>

      </div>

    );

  }


  return (

    <div className="cart-page">

      {/* =====================================
          CART HERO
      ===================================== */}

      <section className="cart-hero">

        <Container>

          <div className="cart-hero-content">

            <span>
              🛒 YOUR SHOPPING BAG
            </span>

            <h1>
              My Cart
            </h1>

            <p>
              Fresh groceries are waiting
              for you!
            </p>

          </div>

        </Container>

      </section>


      {/* =====================================
          CART CONTENT
      ===================================== */}

      <Container className="py-5">

        <Row className="g-4">


          {/* =================================
              CART PRODUCTS
          ================================= */}

          <Col lg={8}>

            <div className="cart-products">

              <div className="cart-heading">

                <h3>
                  Shopping Cart
                </h3>

                <span>
                  {cart.length} product
                  {cart.length > 1
                    ? "s"
                    : ""}
                </span>

              </div>


              {cart.map((item) => (

                <Card
                  className="cart-item"
                  key={item._id}
                >

                  <Row className="align-items-center">


                    {/* PRODUCT IMAGE */}

                    <Col
                      xs={4}
                      md={3}
                    >

                      <div className="cart-product-image">

                        <img
                          src={
                            item.image ||
                            "https://via.placeholder.com/200"
                          }
                          alt={item.name}
                        />

                      </div>

                    </Col>


                    {/* PRODUCT DETAILS */}

                    <Col
                      xs={8}
                      md={4}
                    >

                      <div className="cart-product-details">

                        <small>
                          {item.category ||
                            "Grocery"}
                        </small>

                        <h5>
                          {item.name}
                        </h5>

                        <p>
                          ₹
                          {Number(
                            item.price
                          ).toFixed(2)}
                          {" "} / item
                        </p>

                      </div>

                    </Col>


                    {/* QUANTITY */}

                    <Col
                      xs={6}
                      md={2}
                    >

                      <div className="cart-quantity">

                        <button
                          onClick={() =>
                            decreaseQuantity(
                              item._id
                            )
                          }
                        >
                          −
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(
                              item._id
                            )
                          }
                        >
                          +
                        </button>

                      </div>

                    </Col>


                    {/* TOTAL */}

                    <Col
                      xs={4}
                      md={2}
                    >

                      <div className="cart-item-total">

                        ₹
                        {(
                          Number(item.price) *
                          Number(item.quantity)
                        ).toFixed(2)}

                      </div>

                    </Col>


                    {/* REMOVE */}

                    <Col
                      xs={2}
                      md={1}
                    >

                      <button
                        className="remove-cart-button"
                        onClick={() =>
                          removeFromCart(
                            item._id
                          )
                        }
                        title="Remove"
                      >
                        ×
                      </button>

                    </Col>

                  </Row>

                </Card>

              ))}

            </div>

          </Col>


          {/* =================================
              ORDER SUMMARY
          ================================= */}

          <Col lg={4}>

            <Card className="cart-summary">

              <Card.Body>

                <h3>
                  Order Summary
                </h3>


                {/* SUBTOTAL */}

                <div className="summary-row">

                  <span>
                    Subtotal
                  </span>

                  <strong>
                    ₹
                    {subtotal.toFixed(2)}
                  </strong>

                </div>


                {/* DELIVERY */}

                <div className="summary-row">

                  <span>
                    Delivery
                  </span>

                  <strong>

                    {deliveryCharge === 0
                      ? "FREE"
                      : `₹${deliveryCharge.toFixed(2)}`}

                  </strong>

                </div>


                {/* FREE DELIVERY MESSAGE */}

                {subtotal > 0 &&
                  subtotal < 500 && (

                    <Alert
                      variant="success"
                      className="free-delivery-alert"
                    >

                      Add ₹
                      {(500 - subtotal).toFixed(2)}
                      {" "}
                      more to get
                      <strong>
                        {" "}FREE delivery!
                      </strong>

                    </Alert>

                  )}


                {subtotal >= 500 && (

                  <Alert
                    variant="success"
                    className="free-delivery-alert"
                  >

                    🎉 You got
                    <strong>
                      {" "}FREE delivery!
                    </strong>

                  </Alert>

                )}


                <hr />


                {/* GRAND TOTAL */}

                <div className="grand-total">

                  <span>
                    Grand Total
                  </span>

                  <strong>
                    ₹
                    {grandTotal.toFixed(2)}
                  </strong>

                </div>


                {/* BILLING BUTTON */}

                <Button
                  className="checkout-button"
                  onClick={() =>
                    navigate("/billing")
                  }
                >

                  Proceed to Billing

                  <span>
                    →
                  </span>

                </Button>


                {/* CONTINUE SHOPPING */}

                <Button
                  variant="outline-success"
                  className="continue-shopping"
                  onClick={() =>
                    navigate("/products")
                  }
                >

                  ← Continue Shopping

                </Button>

              </Card.Body>

            </Card>

          </Col>

        </Row>

      </Container>

    </div>

  );

}


export default Cart;