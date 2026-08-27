import { useEffect, useState } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
  Carousel
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

import { useCart } from "../context/CartContext";

import "./Home.css";


function Home() {

  const navigate = useNavigate();

  const { addToCart } = useCart();


  // ==========================================
  // PRODUCTS
  // ==========================================

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // ==========================================
  // FETCH PRODUCTS
  // ==========================================

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const response =
          await API.get("/products");

        console.log(
          "HOME PRODUCTS:",
          response.data
        );


        const productData =
          response.data.products ||
          response.data.data ||
          response.data;


        setProducts(
          Array.isArray(productData)
            ? productData
            : []
        );


      } catch (error) {

        console.log(
          "PRODUCT ERROR:",
          error
        );

        setError(
          "Unable to load products."
        );


      } finally {

        setLoading(false);

      }

    };


    fetchProducts();

  }, []);


  // ==========================================
  // FEATURED PRODUCTS
  // ==========================================

  const featuredProducts =
    products.slice(0, 8);


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="home-page">


      {/* ================================================= */}
      {/* HERO SLIDER */}
      {/* ================================================= */}

      <section className="hero-slider">

        <Carousel
          interval={3000}
          pause={false}
          controls={true}
          indicators={true}
          fade={true}
        >


          {/* =========================================
              SLIDE 1
          ========================================= */}

          <Carousel.Item>

            <div className="hero-slide slide-one">

              <div className="hero-overlay">

                <Container>

                  <Row className="align-items-center">

                    <Col
                      lg={7}
                      md={9}
                      className="hero-content"
                    >

                      <span className="hero-badge">

                        🌱 100% FRESH & NATURAL

                      </span>


                      <h1>

                        Fresh Food.
                        <br />

                        <span>
                          Happy Life.
                        </span>

                      </h1>


                      <p className="hero-quote">

                        "Good food doesn't just
                        fill your stomach,
                        it fills your heart." ❤️

                      </p>


                      <p className="hero-description">

                        Discover farm-fresh fruits,
                        vegetables and everyday
                        groceries delivered straight
                        to your doorstep.

                      </p>


                      <Button
                        className="hero-shop-button"
                        onClick={() =>
                          navigate("/products")
                        }
                      >

                        Shop Fresh Products

                        <span>
                          →
                        </span>

                      </Button>

                    </Col>

                  </Row>

                </Container>

              </div>

            </div>

          </Carousel.Item>


          {/* =========================================
              SLIDE 2
          ========================================= */}

          <Carousel.Item>

            <div className="hero-slide slide-two">

              <div className="hero-overlay">

                <Container>

                  <Row className="align-items-center">

                    <Col
                      lg={7}
                      md={9}
                      className="hero-content"
                    >

                      <span className="hero-badge">

                        🥕 FARM TO YOUR TABLE

                      </span>


                      <h1>

                        Eat Fresh.
                        <br />

                        <span>
                          Live Healthy.
                        </span>

                      </h1>


                      <p className="hero-quote">

                        "Your body deserves
                        the very best." 🌿

                      </p>


                      <p className="hero-description">

                        Choose fresh and healthy
                        groceries for yourself
                        and your family.

                      </p>


                      <Button
                        className="hero-shop-button"
                        onClick={() =>
                          navigate("/products")
                        }
                      >

                        Explore Groceries

                        <span>
                          →
                        </span>

                      </Button>

                    </Col>

                  </Row>

                </Container>

              </div>

            </div>

          </Carousel.Item>


          {/* =========================================
              SLIDE 3
          ========================================= */}

          <Carousel.Item>

            <div className="hero-slide slide-three">

              <div className="hero-overlay">

                <Container>

                  <Row className="align-items-center">

                    <Col
                      lg={7}
                      md={9}
                      className="hero-content"
                    >

                      <span className="hero-badge">

                        🛒 FRESHNESS DELIVERED

                      </span>


                      <h1>

                        Fill Your Basket.
                        <br />

                        <span>
                          Fill Your Happiness.
                        </span>

                      </h1>


                      <p className="hero-quote">

                        "A healthy family
                        starts with a healthy plate." 💚

                      </p>


                      <p className="hero-description">

                        From fresh vegetables
                        to everyday essentials,
                        we've got your kitchen covered.

                      </p>


                      <Button
                        className="hero-shop-button"
                        onClick={() =>
                          navigate("/products")
                        }
                      >

                        Start Shopping

                        <span>
                          →
                        </span>

                      </Button>

                    </Col>

                  </Row>

                </Container>

              </div>

            </div>

          </Carousel.Item>


        </Carousel>

      </section>


      {/* ================================================= */}
      {/* CATEGORIES */}
      {/* ================================================= */}

      <section className="category-section">

        <Container>

          <div className="section-heading">

            <span>
              SHOP OUR COLLECTION
            </span>

            <h2>

              Everything Fresh,
              <br />
              Everything You Need

            </h2>

            <p>

              Pick your favourites from
              our carefully selected range.

            </p>

          </div>


          <Row className="g-4">


            {/* FRUITS */}

            <Col
              lg={3}
              md={6}
              sm={6}
            >

              <div
                className="category-box fruit"
                onClick={() =>
                  navigate("/products")
                }
              >

                <div className="category-image">

                  <img
                    src="https://images.unsplash.com/photo-1610832958506-aa56368176cf"
                    alt="Fresh fruits"
                  />

                </div>


                <div className="category-info">

                  <h4>
                    Fresh Fruits
                  </h4>

                  <p>
                    Sweet & juicy
                  </p>

                  <span>
                    Shop →
                  </span>

                </div>

              </div>

            </Col>


            {/* VEGETABLES */}

            <Col
              lg={3}
              md={6}
              sm={6}
            >

              <div
                className="category-box vegetable"
                onClick={() =>
                  navigate("/products")
                }
              >

                <div className="category-image">

                  <img
                    src="https://images.unsplash.com/photo-1540420773420-3366772f4999"
                    alt="Fresh vegetables"
                  />

                </div>


                <div className="category-info">

                  <h4>
                    Vegetables
                  </h4>

                  <p>
                    Farm fresh
                  </p>

                  <span>
                    Shop →
                  </span>

                </div>

              </div>

            </Col>


            {/* DAIRY */}

            <Col
              lg={3}
              md={6}
              sm={6}
            >

              <div
                className="category-box dairy"
                onClick={() =>
                  navigate("/products")
                }
              >

                <div className="category-image">

                  <img
                    src="https://images.unsplash.com/photo-1628088062854-d1870b4553da"
                    alt="Fresh dairy"
                  />

                </div>


                <div className="category-info">

                  <h4>
                    Dairy
                  </h4>

                  <p>
                    Pure & healthy
                  </p>

                  <span>
                    Shop →
                  </span>

                </div>

              </div>

            </Col>


            {/* BAKERY */}

            <Col
              lg={3}
              md={6}
              sm={6}
            >

              <div
                className="category-box bakery"
                onClick={() =>
                  navigate("/products")
                }
              >

                <div className="category-image">

                  <img
                    src="https://images.unsplash.com/photo-1509440159596-0249088772ff"
                    alt="Fresh bakery"
                  />

                </div>


                <div className="category-info">

                  <h4>
                    Bakery
                  </h4>

                  <p>
                    Freshly baked
                  </p>

                  <span>
                    Shop →
                  </span>

                </div>

              </div>

            </Col>


          </Row>

        </Container>

      </section>


      {/* ================================================= */}
      {/* PROMO BANNER */}
      {/* ================================================= */}

      <section className="promo-section">

        <Container>

          <div className="promo-box">

            <div>

              <span className="promo-label">

                WEEKEND SPECIAL

              </span>


              <h2>

                Freshness
                <br />
                at Your Doorstep

              </h2>


              <p>

                Shop fresh groceries
                and enjoy convenient
                home delivery.

              </p>


              <Button
                onClick={() =>
                  navigate("/products")
                }
              >

                Shop Groceries →

              </Button>

            </div>

          </div>

        </Container>

      </section>


      {/* ================================================= */}
      {/* WHY US */}
      {/* ================================================= */}

      <section className="why-section">

        <Container>

          <div className="section-heading">

            <span>
              WHY FARM ORGANIC?
            </span>

            <h2>
              Freshness You Can Trust
            </h2>

          </div>


          <Row className="g-4">


            <Col md={4}>

              <div className="why-card">

                <div className="why-icon">
                  🌱
                </div>

                <h4>
                  Farm Fresh
                </h4>

                <p>

                  Carefully selected fresh
                  products brought directly
                  from trusted sources.

                </p>

              </div>

            </Col>


            <Col md={4}>

              <div className="why-card">

                <div className="why-icon">
                  🚚
                </div>

                <h4>
                  Quick Delivery
                </h4>

                <p>

                  Get your everyday groceries
                  delivered conveniently
                  to your doorstep.

                </p>

              </div>

            </Col>


            <Col md={4}>

              <div className="why-card">

                <div className="why-icon">
                  💚
                </div>

                <h4>
                  Quality First
                </h4>

                <p>

                  We believe good food
                  should be fresh, healthy
                  and affordable.

                </p>

              </div>

            </Col>


          </Row>

        </Container>

      </section>


      {/* ================================================= */}
      {/* FEATURED PRODUCTS */}
      {/* ================================================= */}

      <section className="featured-section">

        <Container>

          <div className="featured-header">

            <div>

              <span>
                FROM OUR STORE
              </span>

              <h2>
                Customer Favourites
              </h2>

            </div>


            <Button
              variant="outline-success"
              onClick={() =>
                navigate("/products")
              }
            >

              View All Products →

            </Button>

          </div>


          {/* LOADING */}

          {loading && (

            <div className="loading-box">

              <Spinner
                animation="border"
                variant="success"
              />

              <p>
                Loading fresh products...
              </p>

            </div>

          )}


          {/* ERROR */}

          {error && (

            <Alert variant="danger">

              {error}

            </Alert>

          )}


          {/* PRODUCTS */}

          {!loading &&
            !error &&
            featuredProducts.length > 0 && (

              <Row className="g-4">

                {featuredProducts.map(
                  (product) => (

                    <Col
                      lg={3}
                      md={4}
                      sm={6}
                      key={product._id}
                    >

                      <Card
                        className="home-product-card"
                      >

                        <div className="home-product-image">

                          <img
                            src={
                              product.image ||
                              "https://via.placeholder.com/300x250"
                            }
                            alt={product.name}
                          />

                        </div>


                        <Card.Body>

                          <small>

                            {product.category ||
                              "Fresh Grocery"}

                          </small>


                          <h5>
                            {product.name}
                          </h5>


                          <div className="product-bottom">

                            <strong>

                              ₹
                              {Number(
                                product.price
                              ).toFixed(2)}

                            </strong>


                            <button
                              onClick={() =>
                                addToCart(product)
                              }
                            >

                              +

                            </button>

                          </div>

                        </Card.Body>

                      </Card>

                    </Col>

                  )
                )}

              </Row>

            )}


          {/* NO PRODUCTS */}

          {!loading &&
            !error &&
            featuredProducts.length === 0 && (

              <Alert variant="warning">

                No products available right now.

              </Alert>

            )}

        </Container>

      </section>


      {/* ================================================= */}
      {/* FINAL CTA */}
      {/* ================================================= */}

      <section className="final-cta">

        <Container>

          <h2>

            Good Food Starts
            With Good Choices. 🌿

          </h2>


          <p>

            Fill your basket with
            freshness today.

          </p>


          <Button
            onClick={() =>
              navigate("/products")
            }
          >

            Start Shopping →

          </Button>

        </Container>

      </section>


      {/* ================================================= */}
      {/* FOOTER */}
      {/* ================================================= */}

      <footer className="home-footer">

        <Container>

          <Row className="g-4">


            <Col md={4}>

              <h4>
                🌿 FARM ORGANIC
              </h4>

              <p>

                Fresh groceries,
                healthier choices,
                happier families.

              </p>

            </Col>


            <Col md={4}>

              <h5>
                Quick Links
              </h5>


              <p
                onClick={() =>
                  navigate("/")
                }
              >
                Home
              </p>


              <p
                onClick={() =>
                  navigate("/products")
                }
              >
                Products
              </p>


              <p
                onClick={() =>
                  navigate("/about")
                }
              >
                About
              </p>

            </Col>


            <Col md={4}>

              <h5>
                Contact
              </h5>


              <p>
                📞 +91 98765 43210
              </p>


              <p>
                📧 support@farmorganic.com
              </p>


              <p>
                📍 Chennai, India
              </p>

            </Col>


          </Row>


          <hr />


          <div className="copyright">

            © 2026 FARM ORGANIC STORE

          </div>


        </Container>

      </footer>


    </div>

  );

}


export default Home;