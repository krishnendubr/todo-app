import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import CSS file for styling
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Navbar from './Navbar';
import { useEffect } from 'react';



function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true'; // Retrieve login state
        if (isLoggedIn) {
            navigate('/'); // Redirect to home page if already logged in
        }
    }, [navigate]); 

    const handleSubmit = (e) => {
        e.preventDefault();

        // if (email === 'admin' && password === 'password') {
        //     sessionStorage.setItem('isLoggedIn', 'true');
        //     console.log("Login successful, navigating to home.");
        //     navigate('/');
        // } else {
        //     setError('Invalid email or password');
        // }
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            alert('User logged in successfully');
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('email', email);
            navigate('/');

            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
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
                    <button type="submit" className="login-button">Login</button>
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
