import React from 'react';
import ListProjects from './ListProjects';
import AddProject from './AddProject';
import './Home.css';
import Navbar from './Navbar';

const Home = () => {

  return (
    <div className="home-container">
      {/* <nav className="navbar">
        <div className="navbar-logo">
          <h2>Todo App</h2>
        </div>
      </nav> */}
      <Navbar />
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
