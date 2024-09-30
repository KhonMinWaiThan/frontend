// src/components/ProductDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Import the Cart context

const ProductDetail = () => {
    const { id } = useParams(); // Get product ID from URL
    const [product, setProduct] = useState(null); // Product data state
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(''); // Error state

    const { addToCart } = useCart(); // Access addToCart function from context

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true); // Start loading
            try {
                const response = await axios.get(`http://localhost:5000/api/product/${id}`); // Fetch product by ID
                setProduct(response.data); // Set product data
                setLoading(false); // Stop loading
            } catch (error) {
                setError('Error fetching product details'); // Set error message
                setLoading(false); // Stop loading
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator
    }

    if (error) {
        return <div>{error}</div>; // Show error message
    }

    if (!product) {
        return <div>Product not found</div>; // Handle case where product is not found
    }

    const handleAddToCart = () => {
        addToCart(product); // Add the product to the cart
        alert(`${product.name} has been added to the cart!`); // Show confirmation
    };

    return (
        <div className="product-detail">
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} style={{ width: '300px', height: 'auto' }} />
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>{product.description}</p>
            <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};

export default ProductDetail;
