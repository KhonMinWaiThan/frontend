// src/components/LoginRegister.js
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Import the auth context

const LoginRegister = () => {
    const [isRegistering, setIsRegistering] = useState(false); // State to manage form toggle
    const [username, setUsername] = useState(''); // State for the username
    const [email, setEmail] = useState(''); // State for the email
    const [password, setPassword] = useState(''); // State for the password
    const [message, setMessage] = useState(''); // State for messages

    const { login } = useAuth(); // Extract login function from auth context

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent form from refreshing the page
        try {
            // Send registration request to backend
            const response = await axios.post('http://localhost:5000/api/register', {
                username,
                email,
                password,
            });
            setMessage(response.data.message); // Handle successful registration
            
            // Clear form fields
            setUsername('');
            setEmail('');
            setPassword('');
        } catch (error) {
            setMessage(error.response.data.message); // Display error message
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form from refreshing the page
        try {
            // Send login request to backend
            const response = await axios.post('http://localhost:5000/api/login', {
                email,
                password,
            });
            setMessage(response.data.message); // Handle successful login

            const userData = { 
                username: response.data.username, // Get the user's username from response
                email 
            };

            login(userData); // Store the logged-in user's data in auth context

            // Optionally, reset the fields
            setEmail('');
            setPassword('');
        } catch (error) {
            setMessage(error.response.data.message); // Display error message
        }
    };

    return (
        <div className="container mt-5">
            <h2>{isRegistering ? 'Register' : 'Login'}</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={isRegistering ? handleRegister : handleLogin}>
                {isRegistering && (
                    <div className="form-group">
                        <label>Username</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                    </div>
                )}
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    {isRegistering ? 'Register' : 'Login'}
                </button>
                <button 
                    type="button" 
                    className="btn btn-link mt-3" 
                    onClick={() => setIsRegistering(!isRegistering)} // Toggle between registration and login
                >
                    {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
                </button>
            </form>
        </div>
    );
};

export default LoginRegister;
