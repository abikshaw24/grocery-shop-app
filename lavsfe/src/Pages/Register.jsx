import { useState } from "react";

import {
  Container,
  Form,
  Button,
  Card,
  Alert
} from "react-bootstrap";

import API from "../Services/Api";


function Register() {

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    phone: "",
    address: ""

  });


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


    setFormData({

      ...formData,

      [name]: value

    });

  };


  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    setMessage("");

    setError("");


    // ========================================
    // VALIDATION
    // ========================================

    if (

      !formData.name.trim() ||

      !formData.email.trim() ||

      !formData.phone.trim() ||

      !formData.address.trim()

    ) {

      setError(
        "Please fill all fields"
      );

      return;

    }


    try {

      console.log(
        "REGISTER DATA:",
        formData
      );


      // ======================================
      // SEND TO BACKEND
      // ======================================

      const response =
        await API.post(

          "/customers/register",

          formData

        );


      console.log(
        "REGISTRATION RESPONSE:",
        response.data
      );


      // ======================================
      // GET CUSTOMER
      // ======================================

      const customer =
        response.data.customer;


      if (!customer) {

        setError(
          "Customer information was not returned by the server."
        );

        return;

      }


      console.log(
        "CUSTOMER SAVED:",
        customer
      );


      console.log(
        "CUSTOMER ID:",
        customer._id
      );


      // ======================================
      // SAVE CUSTOMER
      // ======================================

      localStorage.setItem(

        "customer",

        JSON.stringify(customer)

      );


      // ======================================
      // SUCCESS MESSAGE
      // ======================================

      setMessage(

        response.data.message ||

        "Registration successful!"

      );


      // ======================================
      // CLEAR FORM
      // ======================================

      setFormData({

        name: "",
        email: "",
        phone: "",
        address: ""

      });


    } catch (error) {

      console.log(
        "REGISTRATION ERROR:",
        error
      );


      console.log(
        "BACKEND ERROR:",
        error.response?.data
      );


      setError(

        error.response?.data?.message ||

        "Registration failed"

      );

    }

  };


  // ==========================================
  // UI
  // ==========================================

  return (

    <Container
      className="py-5"
      style={{
        maxWidth: "700px"
      }}
    >

      <Card className="shadow">

        <Card.Body className="p-4">


          <div className="text-center mb-4">

            <h1>
              👤 Customer Registration
            </h1>

            <p className="text-muted">

              Register to continue
              shopping with us

            </p>

          </div>


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


          <Form
            onSubmit={handleSubmit}
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

                placeholder=
                  "Enter your full name"

                value={
                  formData.name
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

                placeholder=
                  "Enter your email"

                value={
                  formData.email
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

                placeholder=
                  "Enter your phone number"

                value={
                  formData.phone
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

                placeholder=
                  "Enter your delivery address"

                value={
                  formData.address
                }

                onChange={
                  handleChange
                }

              />

            </Form.Group>


            {/* BUTTON */}

            <Button

              type="submit"

              variant="success"

              className="w-100"

            >

              Register & Continue

            </Button>


          </Form>

        </Card.Body>

      </Card>

    </Container>

  );

}


export default Register;