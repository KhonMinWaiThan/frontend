// src/components/UserProfile.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Import the Auth context
import axios from 'axios';

const UserProfile = () => {
    const { user, logout } = useAuth(); // Access user and logout function from Auth context
    const [address, setAddress] = useState({ street: '', city: '', state: '', zip: '' });
    const [message, setMessage] = useState('');

    // Handle input changes for the address fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddress({
            ...address,
            [name]: value,
        });
    };

    // Handle address submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/user/address`, {
                userId: user._id, // Assuming you have a valid user ID from context
                address,
            });
            setMessage(response.data.message); // Set success message after adding address
            
            // Optionally reset form fields
            setAddress({ street: '', city: '', state: '', zip: '' });
        } catch (error) {
            setMessage(error.response.data.message); // Display error message
        }
    };

    return (
        <div className="container mt-5">
            <h2>User Profile</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Street</label>
                    <input
                        type="text"
                        className="form-control"
                        name="street"
                        value={address.street}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>City</label>
                    <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={address.city}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>State</label>
                    <input
                        type="text"
                        className="form-control"
                        name="state"
                        value={address.state}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Zip Code</label>
                    <input
                        type="text"
                        className="form-control"
                        name="zip"
                        value={address.zip}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    Save Address
                </button>
            </form>
            <button className="btn btn-danger mt-4" onClick={logout}>Logout</button> {/* Add Logout Button */}
        </div>
    );
};

export default UserProfile;
