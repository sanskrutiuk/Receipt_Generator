import React, { useState } from 'react';
import ReceiptPreview from './ReceiptPreview';
import './Login.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    repeatPassword: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.repeatPassword) {
      setError('Passwords do not match');
      return;
    }

    // Here you would typically validate against your backend
    // For now, we'll just check if fields are filled
    if (formData.username && formData.password) {
      onLogin({
        fullName: formData.fullName,
        username: formData.username
      });
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-left">
          <h1>Create, edit, preview, and customize</h1>
          <p className="subtitle">Add NGO logo and donor photos to receipts.</p>
          
          <div className="receipt-preview-wrapper">
            <ReceiptPreview />
          </div>
          
          <p className="generate-text">Generate receipts easily.</p>
        </div>

        <div className="login-right">
          <h2>NGO Admin Access</h2>
          <p className="free-text">Secure login for authorized NGO administrators.</p>

          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Admin username"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <input
              type="password"
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleChange}
              placeholder="Repeat password"
              required
            />
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="generate-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; 