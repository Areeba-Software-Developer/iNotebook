import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";

import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";

import Alert from "./components/Alert";

import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

const App = () => {

    return (
        <Router>

            <Navbar />

            <Alert />

            <main className="app-content">

                <Routes>

                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        }
                    />

                    <Route
                        path="/signup"
                        element={
                            <PublicRoute>
                                <Signup />
                            </PublicRoute>
                        }
                    />

                    <Route
                        path="/about"
                        element={<About />}
                    />

                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <Home />
                            </PrivateRoute>
                        }
                    />

                </Routes>

            </main>

        </Router>
    );
};

export default App;