import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/auth/register";
import Home from "./pages/home/Home";
import NavigationBar from "./components/Navbar";
import Login from "./pages/auth/login";
import Products from "./pages/products/Products";
import Cart from "./components/Cart";

const App = () => {
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => setShowCart((prevState) => !prevState);
  const closeCart = () => setShowCart(false);

  return (
    <>
      <NavigationBar toggleForm={toggleCart} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
      </Routes>
      <Cart show={showCart} handleClose={closeCart} />
    </>
  );
};

export default App;
