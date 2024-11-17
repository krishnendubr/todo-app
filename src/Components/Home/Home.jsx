import React from 'react';
import Navbar from '../Navbar/Navbar';
import ListProjects from './../Project/ListProjects';
import AddProject from './../Project/AddProject';
import './Home.css';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    if (sessionStorage.getItem('isLoggedIn') === "false") {
      window.location.href = '/login';
    }
  }, []);

  return (
    <div className="home-container">
      {/* <nav className="navbar">
        <div className="navbar-logo">
          <h2>Todo App</h2>
        </div>
      </nav> */}
      <Navbar/>
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
