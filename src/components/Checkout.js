// src/components/Checkout.js
import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; // Import the Cart context

const Checkout = () => {
    const [address, setAddress] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiration, setExpiration] = useState(''); // Format MM/YY
    const [cvv, setCvv] = useState('');
    const [error, setError] = useState(''); // Error message state
    const [message, setMessage] = useState(''); // Success message state

    const handleCheckout = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // Basic validation for the address field
        if (!address) {
            setError('Address is required'); // Set an error message if address is missing
            return;
        }

        // Log the order details (This is where you might integrate with a payment API)
        console.log('Order about to be processed with address:', address);

        // Simulate an order placement success
        setMessage('Order placed successfully!'); // Set success message
        clearCart(); // Clear the cart after a successful checkout

        // Reset form fields
        setAddress(''); // Reset the address field
        setError(''); // Clear error message after successful order
    };

    return (
        <div>
            <h2>Checkout</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty! Add items to your cart before checkout.</p>
            ) : (
                <form onSubmit={handleCheckout}>
                    {message && <div className="alert alert-success">{message}</div>} {/* Success message */}
                    {error && <div className="alert alert-danger">{error}</div>} {/* Error message */}
                    
                    <div className="form-group">
                        <label>Shipping Address:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={address} 
                            onChange={(e) => setAddress(e.target.value)} 
                            placeholder="Enter your address"
                            required
                        />
                    </div>
                    <h3>Payment Information</h3>
                    <div className="form-group">
                        <label>Card Number:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={cardNumber} 
                            onChange={(e) => setCardNumber(e.target.value)} 
                            placeholder="Enter card number"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Expiration Date (MM/YY):</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={expiration} 
                            onChange={(e) => setExpiration(e.target.value)} 
                            placeholder="MM/YY"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>CVV:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={cvv} 
                            onChange={(e) => setCvv(e.target.value)} 
                            placeholder="CVV"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-success mt-3">
                        Place Order
                    </button>
                </form>
            )}
        </div>
    );
};

export default Checkout;
