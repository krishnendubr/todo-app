import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import ProjectDetails from './Components/Project/ProjectDetails';
import Register from './Components/Register/Register';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check sessionStorage on app load
  useEffect(() => {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
      setIsLoggedIn(true);
      console.log('session storage is true');
      console.log('so is logged in must be true ', isLoggedIn);
    } else {
      console.log('session storage is false');
    }
  }, [isLoggedIn]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={sessionStorage.getItem('isLoggedIn') === 'true' ? <Home /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/login" 
            element={<Login setIsLoggedIn={setIsLoggedIn} />} 
          />
          <Route 
            path="/project/:id" 
            element={sessionStorage.getItem('isLoggedIn') === 'true' ? <ProjectDetails /> : <Navigate to="/login" />} 
          />
          <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
