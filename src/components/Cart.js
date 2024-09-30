// src/components/Cart.js
import React from 'react';
import { useCart } from '../context/CartContext'; // Import the Cart context
import { Link } from 'react-router-dom'; // Import Link for navigation

const Cart = () => {
    const { cartItems, removeFromCart, clearCart } = useCart(); // Access cart items and functions

    const handleRemoveFromCart = (id) => {
        removeFromCart(id); // Remove the product from the cart
    };

    const handleClearCart = () => {
        clearCart(); // Clear all items from the cart
    };

    return (
        <div>
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty!</p>
            ) : (
                <>
                    <ul className="list-group mb-4">
                        {cartItems.map((item) => (
                            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                {item.name} - ${item.price.toFixed(2)}
                                <button 
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleRemoveFromCart(item.id)} // Remove item on click
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <h3>Total: ${cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}</h3>
                    <button className="btn btn-warning" onClick={handleClearCart}>Clear Cart</button> {/* Clear cart option */}
                    <Link to="/checkout" className="btn btn-primary ml-2">Checkout</Link> {/* Link to checkout */}
                </>
            )}
        </div>
    );
};

export default Cart;
