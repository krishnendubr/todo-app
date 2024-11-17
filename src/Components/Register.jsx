import React, { useState } from "react";
import Navbar from "./Navbar";
import "./Register.css"; // Assuming you will create a CSS file for styling
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import "./Register";

const provider = new GoogleAuthProvider();

const Register = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    } else {
      console.log("Password validated");
    }
    var email = form.email;
    var password = form.password;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        alert("User registered successfully");
        const user = userCredential.user;
        console.log(user);
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("email", email);
        // setIsLoggedIn(true);
        navigate("/");
        // navigate('/login');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        alert("User registration failed. ", errorMessage);
        console.log(errorMessage);
        // ..
      });
  };

  const handleGoogleSignup = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        navigate("/login");
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div>
      {/* <Navbar /> */}
      <div className="register-container">
        <div className="register-container-landing">
          <h1 className="register-landing-title">
            A simple to do list
            <br />
            to manage you
          </h1>
          <p className="register-landing-text">
            Easily manage your personal tasks
          </p>
        </div>

        <div className="register-container-box">
          <h1 className="register-title">Register</h1>
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
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
                placeholder="Email"
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
                placeholder="Password"
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
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <button onClick={handleSubmit} type="submit" className="btn">
                Register
              </button>
              <p>
                Already have an account? <a href="/signin">Sign In</a>
              </p>
            </div>
          </form>
          {/* <button onClick={handleGoogleSignup} className="btn google-btn">Sign up with Google</button> */}
        </div>
      </div>
    </div>
  );
};

export default Register;
