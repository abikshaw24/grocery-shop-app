import { useEffect, useState } from "react";

import {
  Container,
  Card,
  Table,
  Form,
  Spinner,
  Alert,
  Badge
} from "react-bootstrap";
import API from "../Services/Api";
import "./AdminOrders.css";


function AdminOrders() {

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [updatingId, setUpdatingId] = useState(null);


  // ==========================================
  // FETCH ALL ORDERS
  // ==========================================

  const fetchOrders = async () => {

    try {

      setLoading(true);
      setError("");

      console.log("FETCHING ALL ORDERS...");


      // IMPORTANT:
      // Backend route is /api/orders/all

      const response = await API.get(
        "/orders/all"
      );


      console.log(
        "ALL ORDERS RESPONSE:",
        response.data
      );


      const orderData =
        response.data.orders || [];


      console.log(
        "ORDERS:",
        orderData
      );


      setOrders(orderData);


    } catch (error) {

      console.log(
        "FETCH ORDERS ERROR:",
        error
      );


      setError(
        error.response?.data?.message ||
        "Unable to load orders."
      );


    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // LOAD ORDERS WHEN PAGE OPENS
  // ==========================================

 useEffect(() => {
  fetchOrders();
}, []);


  // ==========================================
  // UPDATE ORDER STATUS
  // ==========================================

  const updateStatus = async (
    orderId,
    newStatus
  ) => {

    try {

      setUpdatingId(orderId);


      console.log(
        "UPDATING ORDER:",
        orderId
      );

      console.log(
        "NEW STATUS:",
        newStatus
      );


      const response =
        await API.put(

          `/orders/${orderId}/status`,

          {
            status: newStatus
          }

        );


      console.log(
        "STATUS UPDATE RESPONSE:",
        response.data
      );


      // ======================================
      // UPDATE SCREEN
      // ======================================

      setOrders(
        (previousOrders) =>

          previousOrders.map(
            (order) =>

              order._id === orderId

                ? {
                    ...order,

                    // IMPORTANT:
                    // Backend uses orderStatus

                    orderStatus:
                      newStatus

                  }

                : order
          )
      );


    } catch (error) {

      console.log(
        "STATUS UPDATE ERROR:",
        error
      );


      alert(

        error.response?.data?.message ||

        "Unable to update order status."

      );


    } finally {

      setUpdatingId(null);

    }

  };


  // ==========================================
  // STATUS COLOR
  // ==========================================

  const getStatusVariant = (
    status
  ) => {

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

      <div className="admin-orders-page">

        <Container className="py-5">

          <div className="admin-loading">

            <Spinner
              animation="border"
              variant="success"
            />

            <p>
              Loading orders...
            </p>

          </div>

        </Container>

      </div>

    );

  }


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="admin-orders-page">


      {/* =====================================
          HERO
      ===================================== */}

      <section className="admin-orders-hero">

        <Container>

          <div className="admin-hero-content">

            <span>
              🛠️ ADMIN PANEL
            </span>

            <h1>
              Order Management
            </h1>

            <p>
              Manage customer orders
              and update delivery status.
            </p>

          </div>

        </Container>

      </section>


      {/* =====================================
          CONTENT
      ===================================== */}

      <Container className="py-5">


        {/* ERROR */}

        {error && (

          <Alert variant="danger">

            {error}

          </Alert>

        )}


        {/* =====================================
            NO ORDERS
        ===================================== */}

        {!error && orders.length === 0 && (

          <Card className="empty-orders-card">

            <Card.Body>

              <div>
                📦
              </div>

              <h3>
                No Orders Found
              </h3>

              <p>
                Customer orders will appear here.
              </p>

            </Card.Body>

          </Card>

        )}


        {/* =====================================
            ORDERS
        ===================================== */}

        {orders.length > 0 && (

          <>


            <Card className="admin-orders-card">

              <Card.Body>

                <div className="table-responsive">

                  <Table
                    hover
                    className="admin-orders-table"
                  >

                    <thead>

                      <tr>

                        <th>
                          Order
                        </th>

                        <th>
                          Customer
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
                          Update
                        </th>

                      </tr>

                    </thead>


                    <tbody>

                      {orders.map(
                        (order) => {


                          // IMPORTANT:
                          // Backend uses orderStatus

                          const currentStatus =
                            order.orderStatus ||
                            "Pending";


                          return (

                            <tr
                              key={
                                order._id
                              }
                            >


                              {/* ==================
                                  ORDER
                              ================== */}

                              <td>

                                <strong>

                                  #
                                  {order._id
                                    ?.slice(-6)}

                                </strong>

                                <br />

                                <small>

                                  {order.createdAt

                                    ? new Date(
                                        order.createdAt
                                      ).toLocaleDateString()

                                    : "-"
                                  }

                                </small>

                              </td>


                              {/* ==================
                                  CUSTOMER
                              ================== */}

                              <td>

                                <strong>

                                  {
                                    order.customerName ||
                                    "Unknown"
                                  }

                                </strong>

                                <br />

                                <small>

                                  {
                                    order.customerEmail ||
                                    ""
                                  }

                                </small>

                                <br />

                                <small>

                                  {
                                    order.customerPhone ||
                                    ""
                                  }

                                </small>

                              </td>


                              {/* ==================
                                  PRODUCTS
                              ================== */}

                              <td>

                                {order.products?.map(

                                  (
                                    product,
                                    index
                                  ) => (

                                    <div
                                      key={
                                        product.productId ||
                                        product._id ||
                                        index
                                      }
                                      className="admin-product"
                                    >

                                      <span>

                                        {
                                          product.name ||
                                          "Product"
                                        }

                                      </span>

                                      <small>

                                        {" × "}

                                        {
                                          product.quantity ||
                                          0
                                        }

                                      </small>

                                    </div>

                                  )

                                )}

                              </td>


                              {/* ==================
                                  TOTAL
                              ================== */}

                              <td>

                                <strong
                                  className="order-price"
                                >

                                  ₹
                                  {Number(
                                    order.totalAmount ||
                                    0
                                  ).toFixed(2)}

                                </strong>

                              </td>


                              {/* ==================
                                  STATUS
                              ================== */}
<td>
  <Form.Select
    value={currentStatus}
    disabled={updatingId === order._id}
    onChange={(e) =>
      updateStatus(order._id, e.target.value)
    }
  >
    <option value="Pending">Pending</option>
    <option value="Confirmed">Confirmed</option>
    <option value="Preparing">Preparing</option>
    <option value="Out for Delivery">Out for Delivery</option>
    <option value="Delivered">Delivered</option>
  </Form.Select>

  {updatingId === order._id && (
    <small className="updating-text">
      Updating...
    </small>
  )}
</td>


<td>
  <Badge bg={getStatusVariant(currentStatus)}>
    {currentStatus}
  </Badge>
</td>
                             

                              {/* ==================
                                  UPDATE STATUS
                              ================== */}

                              <td>

                                <Form.Select

                                  value={
                                    currentStatus
                                  }

                                  disabled={
                                    updatingId ===
                                    order._id
                                  }

                                  onChange={(e) =>

                                    updateStatus(

                                      order._id,

                                      e.target.value

                                    )

                                  }

                                >

                                  <option value="Pending">
                                    Pending
                                  </option>

                                  <option value="Confirmed">
                                    Confirmed
                                  </option>

                                  <option value="Preparing">
                                    Preparing
                                  </option>

                                  <option value="Out for Delivery">
                                    Out for Delivery
                                  </option>

                                  <option value="Delivered">
                                    Delivered
                                  </option>

                                </Form.Select>


                                {updatingId ===
                                  order._id && (

                                  <small
                                    className="updating-text"
                                  >

                                    Updating...

                                  </small>

                                )}

                              </td>


                            </tr>

                          );

                        }

                      )}

                    </tbody>

                  </Table>

                </div>

              </Card.Body>

            </Card>


            {/* ================================
                ORDER COUNT
            ================================= */}

            <div className="order-count">

              Total Orders:

              <strong>

                {" "}
                {orders.length}

              </strong>

            </div>


          </>

        )}

      </Container>

    </div>

  );

}


export default AdminOrders;