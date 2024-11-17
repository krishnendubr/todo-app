import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import CSS file for styling
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import GoogleLogo from "./../../Assets/Icons/google-icon-logo-svgrepo-com.svg";

const provider = new GoogleAuthProvider();
// import { useEffect } from 'react';

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User logged in
        const user = userCredential.user;
        console.log(user);

        // alert("User logged in successfully");
        console.log('login successful');
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("email", email);
        setIsLoggedIn(true);
        console.log("first login: " + sessionStorage.getItem("isLoggedIn"));

        // setIsLoggedIn(true); // Update app state
        navigate("/"); // Redirect to home
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);
        setError(errorMessage);
      });
  };

  const handleGoogleLogin = () => {
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(token);
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        // alert("User logged in successfully");
        console.log('login successful');
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("email", user.email);
        navigate('/');
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        console.log(email);
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential);
        // ...
      });
  };

  return (
    <div>
      {/* <Navbar /> */}
      <div className="login-container">

        <div className="login-container-landing">
          <h1 className="login-landing-title">A simple to do list<br/>to manage you</h1>
          <p className="login-landing-text">Easily manage your personal tasks</p>
        </div>

        <div className="login-container-box">
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
            
            <div className="login-button-set">
              <button type="submit" className="login-button">
                Login
              </button>
              <button
                type="button"
                className="google-login material-icons"
                onClick={handleGoogleLogin}>
                <img src={GoogleLogo} alt="Google Logo" className="google-logo"/>
              </button>
            </div>

            {/* {error && <p className="error-text">{error}</p>} */}
            {error && <p className="error-text">Wrong email/password</p>}
            <p className="register-link">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="register-here"
              >
                Sign Up
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
