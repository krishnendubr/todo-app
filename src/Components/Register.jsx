
import React, { useState } from 'react';
import Navbar from './Navbar';
import './Register.css'; // Assuming you will create a CSS file for styling
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const auth = getAuth();
        if (form.password !== form.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        else{
            console.log("Password validated")
        }
        var email = form.email;
        var password = form.password;
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            alert('User registered successfully');
            const user = userCredential.user;
            console.log(user);
            navigate('/login'); 
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            
            // ..
        });
    };

    const handleGoogleSignup = () => {
        
    };

    return (
        <div>
            <Navbar />
            <div className="register-container">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button onClick={handleSubmit} type="submit" className="btn">Register</button>
                </form>
                <button onClick={handleGoogleSignup} className="btn google-btn">Sign up with Google</button>
                <p>Already have an account? <a href="/signin">Sign In</a></p>
            </div>
        </div>
    );
};

export default Register;