import { Container, Row, Col, Card } from "react-bootstrap";

function About() {
  return (
    <div className="about-page">

      <section className="about-hero">
        <div className="about-overlay">
          <Container>
            <h1>About Our Grocery Shop</h1>

            <p>
              Fresh food. Happy families. Better living.
            </p>
          </Container>
        </div>
      </section>

      <Container className="py-5">

        <Row className="align-items-center">

          <Col md={6}>

            <h2>Freshness You Can Trust 🌱</h2>

            <p>
              We believe that everyone deserves access to
              fresh, healthy and quality groceries.
            </p>

            <p>
              Our grocery shop brings fresh fruits,
              vegetables, dairy products, bakery items
              and everyday essentials directly to you.
            </p>

          </Col>

          <Col md={6}>

            <Card className="about-card">
              <Card.Body>

                <h3>Why Choose Us?</h3>

                <p>🥦 Fresh Products</p>
                <p>🚚 Fast Delivery</p>
                <p>💰 Affordable Prices</p>
                <p>❤️ Quality You Can Trust</p>

              </Card.Body>
            </Card>

          </Col>

        </Row>

      </Container>

    </div>
  );
}

export default About;