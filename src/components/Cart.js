import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; // Import the Cart context

const Checkout = () => {
    const { cartItems, clearCart } = useCart(); // Access the cart items and functions
    const [address, setAddress] = useState(''); // State for shipping address
    const [cardNumber, setCardNumber] = useState(''); // State for card number
    const [expiration, setExpiration] = useState(''); // State for expiration date (MM/YY)
    const [cvv, setCvv] = useState(''); // State for CVV
    const [error, setError] = useState(''); // Error message state
    const [message, setMessage] = useState(''); // Success message state

    const handleCheckout = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // Basic validation for required fields
        if (!address || !cardNumber || !expiration || !cvv) {
            setError('All fields are required'); // Set an error message for missing fields
            return;
        }

        // Validate card number length: should be 16 digits
        if (cardNumber.length !== 16) {
            setError('Card number must be 16 digits long'); // Error for invalid card number length
            return;
        }

        // Validate expiration date format: MM/YY
        const expirationParts = expiration.split('/');
        if (expirationParts.length !== 2 || 
            expirationParts[0].length !== 2 || 
            expirationParts[1].length !== 2) {
            setError('Expiration date must be in MM/YY format'); // Set an error for invalid date format
            return;
        }

        // Validate CVV length: should be 3 or 4 digits
        if (cvv.length < 3 || cvv.length > 4) {
            setError('CVV must be 3 or 4 digits long'); // Set an error for CVV length
            return;
        }

        // Here you would typically send this data to a payment processing service
        console.log('Order processed:', {
            cartItems,
            address,
            payment: {
                cardNumber,
                expiration,
                cvv,
            },
        });

        // Simulate an order placement success
        setMessage('Order placed successfully!'); // Set success message
        clearCart(); // Clear cart after successful checkout

        // Reset form fields
        setAddress(''); // Reset address field
        setCardNumber(''); // Reset card number field
        setExpiration(''); // Reset expiration field
        setCvv(''); // Reset CVV field
        setError(''); // Clear error message
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
