import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import API from "../Services/Api";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/customers/contact", formData);

      setSuccess("Message sent successfully!");
      setError("");

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      setError("Failed to send message.");
      setSuccess("");
      console.error(err);
    }
  };

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1>Contact Us 📞</h1>
        <p>We'd love to hear from you!</p>
      </div>

      <Row>
        <Col md={6}>
          <h3>Get In Touch</h3>
          <p>📍 Chennai, Tamil Nadu</p>
          <p>📞 +91 98765 43210</p>
          <p>📧 groceryshop@gmail.com</p>
        </Col>

        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                name="message"
                as="textarea"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message"
                required
              />
            </Form.Group>

            {success && <Alert variant="success">{success}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Button variant="success" type="submit">
              Send Message
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;