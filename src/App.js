// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // This would be where your custom styles are
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Welcome from './components/Welcome';
import LoginRegister from './components/LoginRegister';
import UserProfile from './components/UserProfile';
import { CartProvider } from './context/CartContext'; // Import the CartProvider

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="App container mt-4">
          <header className="mb-4">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <Link className="navbar-brand" to="/">Paws-Mart</Link>
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/products">Products</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/cart">Cart</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">Profile</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/checkout">Checkout</Link>
                  </li>
                </ul>
              </div>
            </nav>
          </header>
          
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<LoginRegister />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
          
          <footer className="mt-4">
            <p>&copy; 2024 Paws-Mart</p>
          </footer>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
