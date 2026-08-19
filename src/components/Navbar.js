import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/auth/AuthContext";
import "./Navbar.css";

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    // Get authentication state from AuthContext
    const { isAuthenticated, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">

            <div className="navbar-container">

                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <span className="logo-icon">📔</span>
                    <span>iNotebook</span>
                </Link>

                {/* Navigation */}
                <div
                    className={`navbar-links ${
                        menuOpen ? "active" : ""
                    }`}
                >

                    <Link to="/" className="nav-link">
                        Home
                    </Link>

                    <Link to="/about" className="nav-link">
                        About
                    </Link>

                    <div className="nav-buttons">

                        {!isAuthenticated ? (
                            <>
                               <a
                               href="/login"
                               className="login-btn"
                               onClick={() => setMenuOpen(false)}
                               >
                                Login
                                </a>

                                <a
                                href="/signup"
                                className="signup-btn"
                                onClick={() => setMenuOpen(false)}
                                >
                                Sign Up
                                </a>
                            </>
                        ) : (
                            <button
                            onClick={() => {
                                handleLogout();
                                setMenuOpen(false);
                            }}
                            className="login-btn"
                            >
                                Logout
                            </button>
                        )}

                    </div>

                </div>

                {/* Mobile Menu */}
                <button
                    className="menu-btn"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

            </div>

        </nav>
    );
};

export default Navbar;