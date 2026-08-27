import {
  Container,
  Row,
  Col,
  Form,
  Button
} from "react-bootstrap";

function Contact() {

  return (

    <Container className="py-5">

      <div className="text-center mb-5">

        <h1>Contact Us 📞</h1>

        <p>
          We'd love to hear from you!
        </p>

      </div>

      <Row>

        <Col md={6}>

          <h3>Get In Touch</h3>

          <p>📍 Chennai, Tamil Nadu</p>

          <p>📞 +91 98765 43210</p>

          <p>📧 groceryshop@gmail.com</p>

        </Col>

        <Col md={6}>

          <Form>

            <Form.Group className="mb-3">

              <Form.Label>Name</Form.Label>

              <Form.Control
                type="text"
                placeholder="Enter your name"
              />

            </Form.Group>

            <Form.Group className="mb-3">

              <Form.Label>Email</Form.Label>

              <Form.Control
                type="email"
                placeholder="Enter your email"
              />

            </Form.Group>

            <Form.Group className="mb-3">

              <Form.Label>Message</Form.Label>

              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter your message"
              />

            </Form.Group>

            <Button variant="success">
              Send Message
            </Button>

          </Form>

        </Col>

      </Row>

    </Container>

  );
}

export default Contact;