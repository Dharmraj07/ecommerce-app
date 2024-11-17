import React from "react";
import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/auth-slice/authSlice";

function NavigationBar({ toggleForm }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { totalCartItem } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">E-Commerce App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/products">
              <Nav.Link>Products</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            {!isAuthenticated ? (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </>
            ) : (
              <>
                <Button
                  variant="outline-light"
                  className="position-relative"
                  onClick={toggleForm}
                >
                  Cart
                  {totalCartItem > 0 && (
                    <Badge
                      pill
                      bg="warning"
                      className="position-absolute top-0 start-100 translate-middle"
                    >
                      {totalCartItem}
                    </Badge>
                  )}
                </Button>
                <Button
                  variant="danger"
                  onClick={handleLogout}
                  style={{ marginLeft: "10px", fontWeight: "bold" }}
                >
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
