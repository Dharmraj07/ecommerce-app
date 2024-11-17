import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../store/product-slice/productSlice";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { addToCart } from "../../store/cart-slice/cartSlice";
import ToastNotification from "../../shared/ToastNotification";
import ReactDOM from "react-dom";

const Products = () => {
  const dispatch = useDispatch();

  // Extract Redux state
  const { productList, isLoading, error } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Toast state
  const [toastData, setToastData] = useState({ message: "", variant: "", show: false });

  // Fetch products when the component mounts
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // Add to cart handler
  const addToCartHandle = async (productId) => {
    try {
      await dispatch(addToCart(productId)).unwrap();
      setToastData({
        message: "Product added to cart successfully!",
        variant: "success",
        show: true,
      });
    } catch {
      setToastData({
        message: "Product is already in the cart.",
        variant: "danger",
        show: true,
      });
    }
  };

  // Close toast handler
  const closeToast = () => setToastData({ ...toastData, show: false });

  // Memoize product list
  const memoizedProducts = useMemo(() => productList, [productList]);

  // Loading state
  if (isLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <span className="ms-2">Loading products...</span>
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container className="text-center mt-5">
        <p className="text-danger">Error fetching products: {error}</p>
      </Container>
    );
  }

  // Render products
  return ReactDOM.createPortal(
    <Container>
      <h2 className="my-4">Our Products</h2>

      {/* Toast Notification */}
      <ToastNotification
        show={toastData.show}
        message={toastData.message}
        variant={toastData.variant}
        onClose={closeToast}
      />

      <Row>
        {memoizedProducts.map((product) => (
          <Col sm={12} md={4} lg={3} key={product.productId} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={product.imageUrl}
                className="img-fluid"
                style={{ height: "150px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>${product.price.toFixed(2)}</Card.Text>
                {isAuthenticated && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => addToCartHandle(product.productId)}
                  >
                    Add to Cart
                  </Button>
                )}
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
