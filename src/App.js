import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import ProjectDetails from './Components/ProjectDetails';
import Register from './Components/Register';
import './App.css';

function App() {
   const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true'; // Retrieve login state

   return (
     <Router>
       <div className="App">
         <Routes>
           <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
           <Route path="/login" element={<Login />} />
           <Route path="/project/:id" element={isLoggedIn ? <ProjectDetails /> : <Navigate to="/login" />} />
           <Route path="/register" element={<Register />} /> 
         </Routes>
       </div>
     </Router>
   );
}

export default App;
