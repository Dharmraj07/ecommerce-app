import React, { useState, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import Cart from "./components/Cart";

// Lazy load the pages
const Home = lazy(() => import("./pages/home/Home"));
const Register = lazy(() => import("./pages/auth/register"));
const Login = lazy(() => import("./pages/auth/login"));
const Products = lazy(() => import("./pages/products/Products"));

const App = () => {
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => setShowCart((prevState) => !prevState);
  const closeCart = () => setShowCart(false);

  return (
    <>
      <NavigationBar toggleForm={toggleCart} />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Suspense>
      <Cart show={showCart} handleClose={closeCart} />
    </>
  );
};

export default App;
