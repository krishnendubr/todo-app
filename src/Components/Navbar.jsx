import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location

    const handleLogout = () => {
        sessionStorage.setItem('isLoggedIn', 'false');
        window.location.href = '/login';
    };

    const goToHomepage = () => {
        navigate('/'); // Navigates to the homepage route
    };

    // Check if the current route is Login or Register
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h2>Todo App</h2>
            </div>
            <div className="navbar-links">
                <button className="home-button" onClick={goToHomepage}>Home</button>
                {!isAuthPage && ( // Hide Logout button on Login and Register pages
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

// import { useNavigate } from 'react-router-dom';
// import './Navbar.css';

// const Navbar = () => {
//     const handleLogout = () => {
//         sessionStorage.setItem('isLoggedIn', 'false');
//         window.location.href = '/login';
//       };
//     const navigate = useNavigate();

//     const goToHomepage = () => {
//         navigate('/'); // Navigates to the homepage route
//     };

//     return (
//         <nav className="navbar">
//             <div className="navbar-logo">
//             <h2>Todo App</h2>
//             </div>
//             <div className="navbar-links">
//                 <button className="home-button" onClick={goToHomepage}>Home</button>
//                 <button className="logout-button" onClick={handleLogout}>Logout</button>
//             </div>
//         </nav>
       
//     );
// };

// export default Navbar;




