import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  removeFromCart,
  updateCartQuantity,
} from "../store/cart-slice/cartSlice";
import {
  Table,
  Image,
  Button,
  Form,
  Spinner,
  Alert,
  Offcanvas,
} from "react-bootstrap";

const Cart = ({ show, handleClose }) => {
  const dispatch = useDispatch();

  // Extract state from Redux
  const { cart, error, totalPrice, loading } = useSelector(
    (state) => state.cart
  );

  // Fetch cart items when the cart is opened
  useEffect(() => {
    if (show) {
      dispatch(fetchCart());
    }
  }, [dispatch, show]);

  // Memoize derived cart data
  const memoizedCart = useMemo(() => cart, [cart]);

  // Handlers
  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartQuantity({ productId, quantity: newQuantity }));
    }
  };

  // Render loading state
  if (loading) {
    return (
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="text-center">
          <Spinner animation="border" role="status" />
          <p className="mt-3">Loading...</p>
        </Offcanvas.Body>
      </Offcanvas>
    );
  }

  // Render error state
  if (error) {
    return (
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Alert variant="danger">Error fetching cart: {error}</Alert>
        </Offcanvas.Body>
      </Offcanvas>
    );
  }

  // Render cart content
  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {memoizedCart && memoizedCart.length > 0 ? (
          <>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {memoizedCart.map((item) => (
                  <CartRow
                    key={item.productId}
                    item={item}
                    onRemove={handleRemove}
                    onQuantityChange={handleQuantityChange}
                  />
                ))}
              </tbody>
            </Table>
            <div className="text-end mt-3">
              <h5>Total Price: ${totalPrice.toFixed(2)}</h5>
            </div>
          </>
        ) : (
          <EmptyCartMessage />
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

// Reusable cart row component
const CartRow = ({ item, onRemove, onQuantityChange }) => (
  <tr>
    <td>
      <Image
        src={item.imageUrl}
        alt={item.title}
        thumbnail
        className="cart-img"
      />
    </td>
    <td>{item.title}</td>
    <td>
      <Form.Control
        type="number"
        min="1"
        value={item.quantity}
        onChange={(e) =>
          onQuantityChange(item.productId, parseInt(e.target.value, 10))
        }
        className="cart-qty-input"
      />
    </td>
    <td>${item.price.toFixed(2)}</td>
    <td>
      <Button
        variant="danger"
        size="sm"
        onClick={() => onRemove(item.productId)}
      >
        Remove
      </Button>
    </td>
  </tr>
);

// Reusable empty cart message
const EmptyCartMessage = () => (
  <div className="text-center">
    <h4>Your cart is empty</h4>
    <Button variant="primary" href="/">
      Browse Products
    </Button>
  </div>
);

export default Cart;
