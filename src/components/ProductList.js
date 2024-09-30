// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
import CategorySidebar from './CategorySidebar'; // Import your sidebar component

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All'); // Manage selected category state
  const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000'; // Base URL from environment

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log(`Fetching products for category: ${selectedCategory}`); // Log category info
        const response =
          selectedCategory === 'All'
            ? await axios.get(`${apiBaseUrl}/api/products`) // Fetch all products
            : await axios.get(`${apiBaseUrl}/api/products/category/${selectedCategory}`); // Fetch products by category

        setProducts(response.data); // Set the fetched products to state
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, [selectedCategory, apiBaseUrl]); // Fetch products whenever the selected category changes

  return (
    <div className="product-list">
      <div className="d-flex">
        <div className="sidebar-container mr-4">
          <CategorySidebar setSelectedCategory={setSelectedCategory} /> {/* Render the sidebar */}
        </div>
        <div className="product-container flex-grow-1">
          <h2>Available Products</h2>
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} key={product._id}>
                <Card className="mb-4">
                  <Card.Img
                    className="card-img-top"
                    variant="top"
                    src={product.image}
                    alt={product.name}
                  />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                      Price: ${product.price.toFixed(2)} <br />
                      Rating: {product.rating} ★
                    </Card.Text>
                    <Link to={`/product/${product._id}`} className="btn btn-primary">View Details</Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
