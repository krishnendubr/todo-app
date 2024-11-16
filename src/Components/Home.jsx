import React from 'react';
import { useNavigate } from 'react-router-dom';
import ListProjects from './ListProjects';
import AddProject from './AddProject';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.setItem('isLoggedIn', 'false');
    navigate('/login'); // Use navigate instead of window.location.href
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="navbar-logo">
          <h2>Todo App</h2>
        </div>
        <div className="navbar-links">
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="project-section">
        <div className="list-projects-container">
          <ListProjects />
        </div>
        <div className="add-project-container">
          <AddProject />
        </div>
      </div>
    </div>
  );
};

export default Home;
