import { Link } from "react-router-dom";
import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap";
import { useCart } from "../context/CartContext";


function Navbar() {

  const { getCartCount } = useCart();

  return (

    <BootstrapNavbar
      expand="lg"
      bg="dark"
      variant="dark"
      className="shadow-sm"
    >

      <Container>

        <BootstrapNavbar.Brand as={Link} to="/">
          🥬 FARM ORGANIC STORE
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle
          aria-controls="main-navbar"
        />

        <BootstrapNavbar.Collapse id="main-navbar">

          <Nav className="ms-auto">

            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>

            <Nav.Link as={Link} to="/products">
              Products
            </Nav.Link>

            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>

            <Nav.Link as={Link} to="/cart">

              🛒 Cart

              <span className="badge bg-success ms-1">
                {getCartCount()}
              </span>

            </Nav.Link>

            <Nav.Link as={Link} to="/register">
            👤 Register
            </Nav.Link>

            <Nav.Link as={Link} to="/my-orders">
            📦 My Orders
            </Nav.Link>

          </Nav>

        </BootstrapNavbar.Collapse>

      </Container>

    </BootstrapNavbar>

  );

}

export default Navbar;