import { useEffect, useState } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
  Form
} from "react-bootstrap";

import API from "../Services/Api";

import { useCart } from "../context/CartContext";

import "./Products.css";


function Products() {

  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  // Quantity for each product
  const [quantities, setQuantities] = useState({});


  // ==================================================
  // GET PRODUCTS FROM MONGODB
  // ==================================================

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        setLoading(true);

        const response =
          await API.get("/products");

        console.log(
          "PRODUCTS FROM DATABASE:",
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

        setError("");

      } catch (error) {

        console.log(
          "PRODUCT FETCH ERROR:",
          error
        );

        setError(
          "Unable to load products from database."
        );

      } finally {

        setLoading(false);

      }

    };


    fetchProducts();

  }, []);


  // ==================================================
  // FIX CATEGORY NAMES
  // ==================================================

  const getCategoryName = (productCategory) => {

    if (!productCategory) {
      return "Other";
    }

    const value =
      productCategory
        .toString()
        .trim()
        .toLowerCase();


    if (
      value === "vegetable" ||
      value === "vegetables"
    ) {
      return "Vegetables";
    }


    if (
      value === "fruit" ||
      value === "fruits"
    ) {
      return "Fruits";
    }


    if (
      value === "dairy"
    ) {
      return "Dairy";
    }


    if (
      value === "bakery"
    ) {
      return "Bakery";
    }


    return productCategory;

  };


  // ==================================================
  // CATEGORY BUTTONS
  // ==================================================

  const categories = [
    "All",
    "Vegetables",
    "Fruits",
    "Dairy",
    "Bakery"
  ];


  // ==================================================
  // SEARCH + CATEGORY FILTER
  // ==================================================

  const filteredProducts =
    products.filter((product) => {

      const productCategory =
        getCategoryName(
          product.category
        );


      const matchesSearch =
        product.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );


      const matchesCategory =
        category === "All" ||
        productCategory === category;


      return (
        matchesSearch &&
        matchesCategory
      );

    });


  // ==================================================
  // GET QUANTITY
  // ==================================================

  const getQuantity = (id) => {

    return quantities[id] || 1;

  };


  // ==================================================
  // INCREASE QUANTITY
  // ==================================================

  const increaseProductQuantity = (id) => {

    setQuantities((previous) => ({

      ...previous,

      [id]:
        (previous[id] || 1) + 1

    }));

  };


  // ==================================================
  // DECREASE QUANTITY
  // ==================================================

  const decreaseProductQuantity = (id) => {

    setQuantities((previous) => ({

      ...previous,

      [id]:
        Math.max(
          (previous[id] || 1) - 1,
          1
        )

    }));

  };


  // ==================================================
  // ADD TO CART
  // ==================================================

  const handleAddToCart = (product) => {

    const quantity =
      getQuantity(product._id);


    addToCart({

      ...product,

      quantity: quantity

    });


    // Reset quantity
    setQuantities((previous) => ({

      ...previous,

      [product._id]: 1

    }));


    alert(
      `${product.name} × ${quantity} added to cart!`
    );

  };


  // ==================================================
  // PRODUCT CARD
  // ==================================================

  const ProductCard = ({ product }) => {

    const quantity =
      getQuantity(product._id);


    const productCategory =
      getCategoryName(
        product.category
      );


    return (

      <Col
        lg={3}
        md={4}
        sm={6}
        xs={12}
        key={product._id}
      >

        <Card className="product-card">


          {/* IMAGE */}

          <div className="product-image">

            <img
              src={
                product.image ||
                "https://via.placeholder.com/400x300"
              }
              alt={product.name}
            />

          </div>


          {/* BODY */}

          <Card.Body>


            {/* CATEGORY */}

            <small className="product-category">

              {productCategory}

            </small>


            {/* NAME */}

            <Card.Title>

              {product.name}

            </Card.Title>


            {/* PRICE */}

            <div className="product-price">

              ₹
              {Number(
                product.price || 0
              ).toFixed(2)}

            </div>


            {/* QUANTITY */}

            <div className="quantity-row">

              <span>
                Quantity
              </span>


              <div className="quantity-controls">

                <button
                  type="button"
                  onClick={() =>
                    decreaseProductQuantity(
                      product._id
                    )
                  }
                >

                  −

                </button>


                <span>

                  {quantity}

                </span>


                <button
                  type="button"
                  onClick={() =>
                    increaseProductQuantity(
                      product._id
                    )
                  }
                >

                  +

                </button>

              </div>

            </div>


            {/* SELECTED TOTAL */}

            <div className="product-selected-total">

              Total:

              <strong>

                ₹
                {(
                  Number(
                    product.price || 0
                  ) * quantity
                ).toFixed(2)}

              </strong>

            </div>


            {/* ADD TO CART */}

            <Button
              className="add-cart-button"
              onClick={() =>
                handleAddToCart(product)
              }
            >

              🛒 Add to Cart

            </Button>

          </Card.Body>

        </Card>

      </Col>

    );

  };


  // ==================================================
  // CATEGORY SECTION
  // ==================================================

  const CategorySection = ({
    title,
    emoji,
    categoryName
  }) => {

    const categoryProducts =
      filteredProducts.filter(
        (product) =>
          getCategoryName(
            product.category
          ) === categoryName
      );


    if (categoryProducts.length === 0) {
      return null;
    }


    return (

      <section className="product-category-section">

        <div className="category-section-title">

          <h2>

            {emoji} {title}

          </h2>

          <span>

            {categoryProducts.length} products

          </span>

        </div>


        <Row className="g-4">

          {categoryProducts.map(
            (product) => (

              <ProductCard
                key={product._id}
                product={product}
              />

            )
          )}

        </Row>

      </section>

    );

  };


  // ==================================================
  // PAGE
  // ==================================================

  return (

    <div className="products-page">


      {/* ==================================================
          HERO
      ================================================== */}

      <section className="products-hero">

        <Container>

          <div className="products-hero-content">

            <span>

              🌱 FRESH FROM OUR STORE

            </span>


            <h1>

              Fresh Groceries

            </h1>


            <p>

              Choose fresh.
              Choose healthy.
              Choose happiness.

            </p>

          </div>

        </Container>

      </section>


      {/* ==================================================
          PRODUCTS
      ================================================== */}

      <Container className="py-5">


        {/* ==================================================
            PAGE TITLE
        ================================================== */}

        <div className="text-center mb-4">

          <span
            style={{
              color: "#198754",
              fontWeight: "600"
            }}
          >

            OUR COLLECTION

          </span>


          <h2 className="mt-2">

            Shop Fresh & Healthy

          </h2>


          <p className="text-muted">

            Find everything you need
            for your kitchen.

          </p>

        </div>


        {/* ==================================================
            SEARCH
        ================================================== */}

        <Row className="mb-4">

          <Col
            lg={6}
            md={8}
            className="mx-auto"
          >

            <Form.Control
              type="text"
              placeholder="🔍 Search groceries..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="product-search"
            />

          </Col>

        </Row>


        {/* ==================================================
            CATEGORY BUTTONS
        ================================================== */}

        <div className="category-buttons">

          {categories.map(
            (item) => (

              <Button
                key={item}
                variant={
                  category === item
                    ? "success"
                    : "outline-success"
                }
                onClick={() =>
                  setCategory(item)
                }
              >

                {item === "All" && "🛒 "}

                {item === "Vegetables" &&
                  "🥕 "}

                {item === "Fruits" &&
                  "🍎 "}

                {item === "Dairy" &&
                  "🥛 "}

                {item === "Bakery" &&
                  "🥖 "}

                {item}

              </Button>

            )
          )}

        </div>


        {/* ==================================================
            LOADING
        ================================================== */}

        {loading && (

          <div className="products-loading">

            <Spinner
              animation="border"
              variant="success"
            />


            <p>

              Loading fresh products...

            </p>

          </div>

        )}


        {/* ==================================================
            ERROR
        ================================================== */}

        {!loading && error && (

          <Alert variant="danger">

            {error}

          </Alert>

        )}


        {/* ==================================================
            PRODUCTS
        ================================================== */}

        {!loading &&
          !error && (

            <>


              {/* ==================================================
                  ALL PRODUCTS
              ================================================== */}

              {category === "All" && (

                <>

                  <CategorySection
                    title="Fresh Vegetables"
                    emoji="🥕"
                    categoryName="Vegetables"
                  />


                  <CategorySection
                    title="Fresh Fruits"
                    emoji="🍎"
                    categoryName="Fruits"
                  />


                  <CategorySection
                    title="Dairy Products"
                    emoji="🥛"
                    categoryName="Dairy"
                  />


                  <CategorySection
                    title="Fresh Bakery"
                    emoji="🥖"
                    categoryName="Bakery"
                  />


                  {/* OTHER PRODUCTS */}

                  {filteredProducts.some(
                    (product) =>
                      ![
                        "Vegetables",
                        "Fruits",
                        "Dairy",
                        "Bakery"
                      ].includes(
                        getCategoryName(
                          product.category
                        )
                      )
                  ) && (

                    <CategorySection
                      title="Other Groceries"
                      emoji="🛒"
                      categoryName="Other"
                    />

                  )}

                </>

              )}


              {/* ==================================================
                  SELECTED CATEGORY
              ================================================== */}

              {category !== "All" && (

                <CategorySection
                  title={
                    category === "Vegetables"
                      ? "Fresh Vegetables"
                      : category === "Fruits"
                      ? "Fresh Fruits"
                      : category === "Dairy"
                      ? "Dairy Products"
                      : "Fresh Bakery"
                  }
                  emoji={
                    category === "Vegetables"
                      ? "🥕"
                      : category === "Fruits"
                      ? "🍎"
                      : category === "Dairy"
                      ? "🥛"
                      : "🥖"
                  }
                  categoryName={category}
                />

              )}


              {/* ==================================================
                  NO PRODUCTS
              ================================================== */}

              {filteredProducts.length === 0 && (

                <div className="no-products">

                  <h3>

                    😔 No products found

                  </h3>


                  <p>

                    Try another search or
                    category.

                  </p>


                  <Button
                    variant="success"
                    onClick={() => {

                      setSearch("");

                      setCategory("All");

                    }}
                  >

                    Show All Products

                  </Button>

                </div>

              )}

            </>

          )}

      </Container>

    </div>

  );

}


export default Products;
