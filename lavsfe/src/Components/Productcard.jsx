import { Card, Button } from "react-bootstrap";
import { useState } from "react";

import { useCart } from "../context/CartContext";

function ProductCard({ product }) {

  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  // PLUS BUTTON
  const increaseQuantity = () => {

    if (quantity < product.stock) {

      setQuantity(quantity + 1);

    }

  };

  // MINUS BUTTON
  const decreaseQuantity = () => {

    if (quantity > 1) {

      setQuantity(quantity - 1);

    }

  };

  // ADD TO CART
  const handleAddToCart = () => {

    addToCart(product, quantity);

    alert(`${product.name} added to cart!`);

  };

  return (

    <Card className="product-card h-100 shadow-sm">

      <Card.Img
        variant="top"
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <Card.Body className="text-center">

        <small className="text-success">
          {product.category}
        </small>

        <Card.Title className="mt-2">
          {product.name}
        </Card.Title>

        <Card.Text>
          {product.description}
        </Card.Text>

        <h5>
          ₹{product.price}
        </h5>

        <p className="text-muted">
          Stock: {product.stock}
        </p>

        {/* QUANTITY */}

        <div className="d-flex justify-content-center align-items-center gap-3">

          <Button
            variant="outline-success"
            onClick={decreaseQuantity}
          >
            -
          </Button>

          <strong>
            {quantity}
          </strong>

          <Button
            variant="outline-success"
            onClick={increaseQuantity}
          >
            +
          </Button>

        </div>

        {/* ADD TO CART */}

        <Button
          variant="success"
          className="w-100 mt-3"
          onClick={handleAddToCart}
        >
          🛒 Add to Cart
        </Button>

      </Card.Body>

    </Card>

  );

}

export default ProductCard;