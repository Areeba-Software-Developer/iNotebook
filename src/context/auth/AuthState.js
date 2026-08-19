import React, { useState } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {

    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("token")
    );

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    // Login
    const login = (authToken, userData = null) => {

        localStorage.setItem("token", authToken);

        if (userData) {
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
        }

        setIsAuthenticated(true);
    };

    // Logout
    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                login,
                logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;