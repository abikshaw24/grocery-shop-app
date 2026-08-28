import { useState } from "react";

import {
  Container,
  Card,
  Form,
  Button,
  Alert
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import "./AdminLogin.css"


function AdminLogin() {

  const navigate = useNavigate();


  // =====================================
  // FORM DATA
  // =====================================

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");


  // =====================================
  // ERROR
  // =====================================

  const [error, setError] = useState("");


  // =====================================
  // LOGIN
  // =====================================

  const handleLogin = (e) => {

    e.preventDefault();

    setError("");


    // =====================================
    // TEMPORARY ADMIN LOGIN
    // =====================================

    const adminEmail =
      "admin@grocery.com";

    const adminPassword =
      "admin123";


    // =====================================
    // CHECK LOGIN
    // =====================================

    if (
      email === adminEmail &&
      password === adminPassword
    ) {

      // SAVE ADMIN LOGIN

      localStorage.setItem(
        "adminLoggedIn",
        "true"
      );


      // GO TO ADMIN ORDERS

      navigate("/admin/orders");

    } else {

      setError(
        "Invalid admin email or password."
      );

    }

  };


  return (

    <div className="admin-login-page">

      <Container>

        <div className="admin-login-wrapper">

          <Card className="admin-login-card shadow">


            <Card.Body className="p-4">


              {/* =================================
                  TITLE
              ================================= */}

              <div className="admin-login-heading">

                <div className="admin-icon">
                  👨‍💼
                </div>

                <h1>
                  Admin Login
                </h1>

                <p>
                  FARM ORGANIC STORE
                </p>

              </div>


              {/* =================================
                  ERROR
              ================================= */}

              {error && (

                <Alert variant="danger">

                  {error}

                </Alert>

              )}


              {/* =================================
                  FORM
              ================================= */}

              <Form
                onSubmit={handleLogin}
              >


                {/* EMAIL */}

                <Form.Group
                  className="mb-3"
                >

                  <Form.Label>
                    Admin Email
                  </Form.Label>

                  <Form.Control

                    type="email"

                    placeholder="Enter admin email"

                    value={email}

                    onChange={(e) =>
                      setEmail(e.target.value)
                    }

                    required

                  />

                </Form.Group>


                {/* PASSWORD */}

                <Form.Group
                  className="mb-4"
                >

                  <Form.Label>
                    Password
                  </Form.Label>

                  <Form.Control

                    type="password"

                    placeholder="Enter admin password"

                    value={password}

                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }

                    required

                  />

                </Form.Group>


                {/* LOGIN BUTTON */}

                <Button

                  type="submit"

                  variant="success"

                  className="w-100"

                  size="lg"

                >

                  🔐 Login

                </Button>


              </Form>


              {/* =================================
                  BACK BUTTON
              ================================= */}

              <div className="text-center mt-3">

                <Button

                  variant="link"

                  onClick={() =>
                    navigate("/")
                  }

                >

                  ← Back to Store

                </Button>

              </div>


            </Card.Body>

          </Card>

        </div>

      </Container>

    </div>

  );

}


export default AdminLogin;