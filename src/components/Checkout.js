import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; // Ensure proper path and usage

const Checkout = () => {
    const { cartItems, clearCart } = useCart(); // This should provide both cartItems and clearCart
    const [address, setAddress] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiration, setExpiration] = useState('');
    const [cvv, setCvv] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleCheckout = (event) => {
        event.preventDefault();

        if (!address) {
            setError('Address is required');
            return;
        }

        if (cartItems.length === 0) {
            setError('Your cart is empty.');
            return;
        }

        console.log('Order processed with address:', address);

        setMessage('Order placed successfully!');
        clearCart();

        // Reset fields
        setAddress('');
        setCardNumber('');
        setExpiration('');
        setCvv('');
        setError('');
    };

    return (
        <div>
            <h2>Checkout</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty! Add items to your cart before checkout.</p>
            ) : (
                <form onSubmit={handleCheckout}>
                    {message && <div className="alert alert-success">{message}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}
                    
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
