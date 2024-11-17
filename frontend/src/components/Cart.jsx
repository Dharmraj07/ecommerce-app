import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeFromCart, updateCartQuantity } from "../store/cart-slice/cartSlice";
import { Table, Image, Button, Form, Spinner, Alert, Offcanvas } from "react-bootstrap";

const Cart = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const { cart, error, totalPrice, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    if (show) {
      dispatch(fetchCart());
    }
  }, [dispatch, show]);

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartQuantity({ productId, quantity: newQuantity }));
    }
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : error ? (
          <Alert variant="danger">There was an issue fetching your cart. Please try again later.</Alert>
        ) : cart && cart.length > 0 ? (
          <>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                  {/* <th>Total</th> */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.productId}>
                    <td>
                      <Image src={item.imageUrl} alt={item.title} thumbnail style={{ width: "50px" }} />
                    </td>
                    <td>{item.title}</td>
                    <td>
                      <Form.Control
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value, 10))}
                        style={{ width: "60px" }}
                      />
                    </td>
                    <td>${item.price.toFixed(2)}</td>
                    {/* <td>${(item.price * item.quantity).toFixed(2)}</td> */}
                    <td>
                      <Button variant="danger" size="sm" onClick={() => handleRemove(item.productId)}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-end mt-3">
              <h5>Total Price: ${totalPrice.toFixed(2)}</h5>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h4>Your cart is empty</h4>
            <Button variant="primary" href="/">
              Browse Products
            </Button>
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
