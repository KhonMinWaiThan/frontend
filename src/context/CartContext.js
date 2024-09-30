import React, { createContext, useContext, useState } from 'react';

// Create Cart Context
const CartContext = createContext();

// Export a custom hook to use the Cart Context
export const useCart = () => {
    return useContext(CartContext);
};

// Create a provider component
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems((prevItems) => [...prevItems, product]); // Adds the product to the cart
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id)); // Remove by ID
    };

    const clearCart = () => {
        setCartItems([]); // Clear all items in the cart
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
