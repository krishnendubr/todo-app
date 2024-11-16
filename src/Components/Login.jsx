import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import CSS file for styling
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Navbar from './Navbar';
// import { useEffect } from 'react';

function Login({ setIsLoggedIn }) {
    const navigate = useNavigate();
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // User logged in
          const user = userCredential.user;
          console.log(user);
  
          alert('User logged in successfully');
          sessionStorage.setItem('isLoggedIn', 'true');
          sessionStorage.setItem('email', email);
          console.log('first login: '+sessionStorage.getItem('isLoggedIn'));
  
          setIsLoggedIn(true); // Update app state
          navigate('/'); // Redirect to home
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          const errorMessage = error.message;
          console.log(errorMessage);
          setError(errorMessage);
        });
    };
  
    return (
      <div>
        <Navbar />
        <div className="login-container">
          <h1 className="login-title">Login</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {error && <p className="error-text">{error}</p>}
            <p className="register-link">
              Don't have an account?{' '}
              <span onClick={() => navigate('/register')} className="register-here">
                Sign Up
              </span>
            </p>
          </form>
        </div>
      </div>
    );
  }
  
  export default Login;
  