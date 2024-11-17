import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container, Col } from "react-bootstrap";
import { loginUser } from "../../store/auth-slice/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(formData)).unwrap();
      navigate("/products"); // Redirect to dashboard or other page upon successful login
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Container className="mt-5 align-items-center justify-content-center">
      <Col xs={12} sm={8} md={6} lg={4}>
        <h2>Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
        <p className="mt-3">
          Don't have an account?{" "}
          <Link to="/register">
            <Button variant="link" className="p-0 text-decoration-none">
              Register
            </Button>
          </Link>
        </p>
      </Col>
    </Container>
  );
};

export default Login;
