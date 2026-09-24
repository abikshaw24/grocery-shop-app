import {
  Container,
  Card,
  Button
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import "./OrderSuccess.css";

function OrderSuccess() {

  const navigate = useNavigate();

  // ==========================================
  // GET LAST ORDER
  // ==========================================

  const savedOrder = JSON.parse(localStorage.getItem("lastOrder"));

  // ==========================================
  // IF ORDER DOES NOT EXIST
  // ==========================================

  if (!savedOrder) {
    return (
      <Container className="py-5">
        <div className="order-not-found">
          <h2>No Order Found</h2>

          <p>Please place an order first.</p>

          <Button
            variant="success"
            onClick={() => navigate("/products")}
          >
            Start Shopping
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <div className="order-success-page">
      <Container>
        <Card className="success-card">
          <Card.Body>

            {/* SUCCESS ICON */}

            <div className="success-icon">✓</div>

            {/* SUCCESS MESSAGE */}

            <h1>Order Placed Successfully!</h1>

            <p className="success-message">
              🎉 Thank you for shopping with FARM ORGANIC STORE!
            </p>

            {/* ORDER ID */}

            <div className="order-id-box">
              <span>Order ID</span>

              <strong>
                {savedOrder._id ||
                  savedOrder.orderId ||
                  "ORD-" + Date.now()}
              </strong>
            </div>

            {/* CUSTOMER DETAILS */}

            <div className="success-details">

              <div>
                <span>Customer</span>

                <strong>
                  {savedOrder.customerName || "Customer"}
                </strong>
              </div>

              <div>
                <span>Phone</span>

                <strong>
                  {savedOrder.customerPhone || "Not available"}
                </strong>
              </div>

              <div>
                <span>Delivery Address</span>

                <strong>
                  {savedOrder.deliveryAddress || "Not available"}
                </strong>
              </div>

            </div>

            {/* ORDER STATUS */}

            <div className="status-box">
              <span>Order Status</span>

              <strong>
                🟡 {savedOrder.orderStatus || "Pending"}
              </strong>
            </div>

            {/* TOTAL */}

            <div className="success-total">
              <span>Total Amount</span>

              <strong>
                ₹{Number(savedOrder.totalAmount || 0).toFixed(2)}
              </strong>
            </div>

            {/* BUTTONS */}

            <div className="success-buttons">

              <Button
                variant="success"
                onClick={() => navigate("/products")}
              >
                🛍️ Continue Shopping
              </Button>

              <Button
                variant="outline-success"
                onClick={() => navigate("/")}
              >
                🏠 Back to Home
              </Button>

            </div>

          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default OrderSuccess;