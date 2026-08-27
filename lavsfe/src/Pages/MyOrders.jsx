import { useEffect, useState } from "react";

import {
  Container,
  Card,
  Table,
  Badge,
  Spinner,
  Alert,
  Button
} from "react-bootstrap";

import API from "../services/api";


// ==========================================
// MY ORDERS COMPONENT
// ==========================================

function MyOrders() {

  // ==========================================
  // STATES
  // ==========================================

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // ==========================================
  // LOAD CUSTOMER ORDERS
  // ==========================================

  const fetchMyOrders = async () => {

    try {

      setLoading(true);

      setError("");


      // ========================================
      // GET CUSTOMER FROM LOCAL STORAGE
      // ========================================

      const storedCustomer =
        localStorage.getItem("customer");


      // Customer not registered

      if (!storedCustomer) {

        setError(
          "Please register before viewing your orders."
        );

        setLoading(false);

        return;

      }


      // ========================================
      // CONVERT STRING TO OBJECT
      // ========================================

      const customer =
        JSON.parse(storedCustomer);


      console.log(
        "CUSTOMER FROM LOCAL STORAGE:",
        customer
      );


      // ========================================
      // GET CUSTOMER ID
      // ========================================

      const customerId =
        customer?._id;


      console.log(
        "CUSTOMER ID:",
        customerId
      );


      // Customer ID missing

      if (!customerId) {

        setError(
          "Customer ID is missing. Please register again."
        );

        setLoading(false);

        return;

      }


      // ========================================
      // GET ORDERS FROM BACKEND
      // ========================================

      const response =
        await API.get(
          `/orders/customer/${customerId}`
        );


      console.log(
        "MY ORDERS RESPONSE:",
        response.data
      );


      // ========================================
      // SAVE ORDERS TO STATE
      // ========================================

      setOrders(
        response.data?.orders || []
      );


    } catch (error) {

      console.log(
        "MY ORDERS ERROR:",
        error
      );


      // ========================================
      // ERROR MESSAGE
      // ========================================

      setError(

        error.response?.data?.message ||

        "Unable to load your orders."

      );


    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // LOAD ORDERS WHEN PAGE OPENS
  // ==========================================

  useEffect(() => {

    fetchMyOrders();

  }, []);


  // ==========================================
  // STATUS COLOR
  // ==========================================

  const getStatusVariant = (status) => {

    switch (
      status?.toLowerCase()
    ) {

      case "pending":
        return "warning";

      case "confirmed":
        return "primary";

      case "preparing":
        return "info";

      case "out for delivery":
        return "secondary";

      case "delivered":
        return "success";

      default:
        return "dark";

    }

  };


  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (loading) {

    return (

      <Container
        className="py-5 text-center"
      >

        <Spinner
          animation="border"
          variant="success"
        />

        <p className="mt-3">

          Loading your orders...

        </p>

      </Container>

    );

  }


  // ==========================================
  // MAIN PAGE
  // ==========================================

  return (

    <Container
      className="py-5"
    >


      {/* ======================================
          PAGE TITLE
      ====================================== */}

      <div
        className="text-center mb-5"
      >

        <h1>

          📦 My Orders

        </h1>


        <p className="text-muted">

          Track your grocery orders

        </p>

      </div>


      {/* ======================================
          ERROR MESSAGE
      ====================================== */}

      {error && (

        <Alert
          variant="danger"
          className="mb-4"
        >

          {error}

        </Alert>

      )}


      {/* ======================================
          NO ORDERS
      ====================================== */}

      {!error &&
        orders.length === 0 && (

          <Card
            className="text-center shadow"
          >

            <Card.Body
              className="p-5"
            >

              <div
                style={{
                  fontSize: "60px"
                }}
              >

                🛒

              </div>


              <h3
                className="mt-3"
              >

                No Orders Yet

              </h3>


              <p
                className="text-muted"
              >

                Your placed orders will
                appear here.

              </p>


              <Button
                variant="success"
                href="/products"
              >

                Continue Shopping

              </Button>

            </Card.Body>

          </Card>

        )}


      {/* ======================================
          ORDERS TABLE
      ====================================== */}

      {orders.length > 0 && (

        <Card
          className="shadow"
        >

          <Card.Body>

            <div
              className="table-responsive"
            >

              <Table
                hover
                responsive
                className="align-middle"
              >


                {/* =================================
                    TABLE HEADER
                ================================= */}

                <thead>

                  <tr>

                    <th>
                      Order
                    </th>

                    <th>
                      Products
                    </th>

                    <th>
                      Total
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Date
                    </th>

                  </tr>

                </thead>


                {/* =================================
                    TABLE BODY
                ================================= */}

                <tbody>

                  {orders.map(
                    (order) => (

                      <tr
                        key={order._id}
                      >


                        {/* ==========================
                            ORDER ID
                        ========================== */}

                        <td>

                          <strong>

                            #

                            {order._id
                              ?.slice(-6)}

                          </strong>

                        </td>


                        {/* ==========================
                            PRODUCTS
                        ========================== */}

                        <td>

                          {order.products?.map(

                            (
                              product,
                              index
                            ) => (

                              <div
                                key={index}
                                className="mb-1"
                              >

                                <strong>

                                  {product.name}

                                </strong>

                                {" × "}

                                {product.quantity}

                              </div>

                            )

                          )}

                        </td>


                        {/* ==========================
                            TOTAL
                        ========================== */}

                        <td>

                          <strong>

                            ₹

                            {Number(
                              order.totalAmount || 0
                            ).toFixed(2)}

                          </strong>

                        </td>


                        {/* ==========================
                            STATUS
                        ========================== */}

                        <td>

                          <Badge
                            bg={
                              getStatusVariant(
                                order.orderStatus
                              )
                            }
                          >

                            {order.orderStatus ||
                              "Pending"}

                          </Badge>

                        </td>


                        {/* ==========================
                            DATE
                        ========================== */}

                        <td>

                          {order.createdAt

                            ? new Date(
                                order.createdAt
                              ).toLocaleDateString()

                            : "-"

                          }

                        </td>


                      </tr>

                    )

                  )}

                </tbody>


              </Table>

            </div>

          </Card.Body>

        </Card>

      )}


    </Container>

  );

}


// ==========================================
// EXPORT
// ==========================================

export default MyOrders;