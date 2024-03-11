
import React, { useState } from 'react';
import axios from 'axios';
import './AdminLoginPage.css'; 

function AdminLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/login', { username, password });
            if (response.data.success) {
                alert('Login successful');

                window.location.href = '/admin';
                // Redirect to the admin dashboard upon successful login
                // You can use React Router or any other method for navigation
            } else {
                setError('Invalid username or password');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('An error occurred while logging in, please try again');
        }
    };

    return (
        <div className="admin-login-container">
            <h2 className="admin-login-title">Admin Login</h2>
            <div className="admin-login-form">
                <div className="admin-login-input">
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="admin-login-input">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="admin-login-button" onClick={handleLogin}>Login</button>
                {error && <p className="admin-login-error">{error}</p>}
            </div>
        </div>
    );
}
export default AdminLoginPage;
