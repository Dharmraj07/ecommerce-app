import React, { useMemo } from "react";
import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/auth-slice/authSlice";

const NavLinks = () => (
  <>
    <LinkContainer to="/">
      <Nav.Link>Home</Nav.Link>
    </LinkContainer>
    <LinkContainer to="/products">
      <Nav.Link>Products</Nav.Link>
    </LinkContainer>
  </>
);

const AuthButtons = ({
  isAuthenticated,
  totalCartItem,
  onLogout,
  toggleForm,
}) => {
  if (!isAuthenticated) {
    return (
      <>
        <LinkContainer to="/login">
          <Nav.Link>Login</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/register">
          <Nav.Link>Register</Nav.Link>
        </LinkContainer>
      </>
    );
  }

  return (
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
      <Button variant="danger" className="ms-2 fw-bold" onClick={onLogout}>
        Logout
      </Button>
    </>
  );
};

const NavigationBar = ({ toggleForm }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const totalCartItem = useSelector((state) => state.cart.totalCartItem);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const memoizedAuth = useMemo(() => isAuthenticated, [isAuthenticated]);
  const memoizedCartItems = useMemo(() => totalCartItem, [totalCartItem]);

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
            <NavLinks />
          </Nav>
          <Nav>
            <AuthButtons
              isAuthenticated={memoizedAuth}
              totalCartItem={memoizedCartItems}
              onLogout={handleLogout}
              toggleForm={toggleForm}
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
