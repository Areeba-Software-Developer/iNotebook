import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/auth/AuthContext";

const PublicRoute = ({ children }) => {

    const { isAuthenticated } = useContext(AuthContext);

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PublicRoute;