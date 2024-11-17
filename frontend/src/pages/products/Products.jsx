import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../store/product-slice/productSlice";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Toast,
} from "react-bootstrap";
import { addToCart } from "../../store/cart-slice/cartSlice";
import ReactDOM from "react-dom";

const Products = () => {
  // Get the necessary data from Redux store
  const dispatch = useDispatch();
  const { productList, isLoading, error } = useSelector(
    (state) => state.products
  );

  const { isAuthenticated } = useSelector((state) => state.auth);


  // State for managing toast visibility
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success"); // success or danger

  // Fetch products when the component mounts
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  // Add to cart function
  const addToCartHandle = (productId) => {
    dispatch(addToCart(productId))
      .unwrap()
      .then(() => {
        setToastMessage("Product added to cart successfully!");
        setToastVariant("success");
        setShowToast(true);
      })
      .catch(() => {
        setToastMessage("Product is already in the cart");
        setToastVariant("danger");
        setShowToast(true);
      });
  };

  // Show loading spinner while fetching
  if (isLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <span className="ms-2">Loading products...</span>
      </Container>
    );
  }

  // Handle error state
  if (error) {
    return (
      <Container className="text-center mt-5">
        <p>Error fetching products: {error}</p>
      </Container>
    );
  }

  // Render product list
  return ReactDOM.createPortal(
    <Container>
      <h2 className="my-4">Our Products</h2>

      {/* Toast Notification */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        bg={toastVariant} // success or danger
        className="position-fixed bottom-0 end-0 m-3"
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>

      <Row>
        {productList.map((product) => (
          <Col
            sm={12}
            md={4}
            lg={3}
            key={product.productId} // Use unique product identifier
            className="mb-4"
          >
            <Card style={{ fontSize: "0.9rem" }}>
              <Card.Img
                variant="top"
                src={product.imageUrl}
                style={{ height: "150px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                {isAuthenticated &&
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => addToCartHandle(product.productId)}
                >
                  Add to Cart
                </Button> }
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>,
    document.getElementById("portal-root")
  );
};

export default Products;
