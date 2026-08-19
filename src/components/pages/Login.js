import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import "./Login.css";

const Login = () => {

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });

    const [authAlert, setAuthAlert] = useState({
        show: false,
        type: "",
        message: ""
    });

    const [loading, setLoading] = useState(false);


    // ===============================
    // EMAIL VALIDATION
    // ===============================

    const validateEmail = (email) => {

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(email);
    };


    // ===============================
    // FIELD VALIDATION
    // ===============================

    const validateField = (name, value) => {

        let error = "";

        if (name === "email") {

            if (!value) {

                error = "Email is required";

            } else if (!validateEmail(value)) {

                error = "Please enter a valid email address";
            }
        }

        if (name === "password") {

            if (!value) {

                error = "Password is required";
            }
        }

        setErrors((previous) => ({
            ...previous,
            [name]: error
        }));

        return error === "";
    };


    // ===============================
    // INPUT CHANGE
    // ===============================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setCredentials((previous) => ({
            ...previous,
            [name]: value
        }));

        validateField(name, value);
    };


    // ===============================
    // LOGIN
    // ===============================

    const handleSubmit = async (e) => {

        e.preventDefault();

        const emailValid = validateField(
            "email",
            credentials.email
        );

        const passwordValid = validateField(
            "password",
            credentials.password
        );

        if (!emailValid || !passwordValid) {

            setAuthAlert({
                show: true,
                type: "error",
                message: "Please fix the highlighted errors"
            });

            return;
        }

        setLoading(true);

        try {

            const API_URL = process.env.REACT_APP_API_URL;

            if (!API_URL) {
                throw new Error(
                    "REACT_APP_API_URL is not defined"
                );
            }

            const response = await fetch(
                `${API_URL}/api/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: credentials.email.trim(),
                        password: credentials.password
                    })
                }
            );

            const data = await response.json();
            console.log("LOGIN RESPONSE:", data);

            if (!response.ok) {

                const message =
                    data.error ||
                    (data.errors && data.errors[0]?.msg) ||
                    "Login failed";

                throw new Error(message);
            }

            if (!data.authToken) {

                throw new Error(
                    "Authentication token was not received"
                );
            }

            // Save token
            login(data.authToken, data.user);

            setAuthAlert({
                show: true,
                type: "success",
                message: "Login successful!"
            });

            setTimeout(() => {

                navigate("/");

            }, 500);

        } catch (error) {

            console.error("Login error:", error);

            setAuthAlert({
                show: true,
                type: "error",
                message: error.message || "Unable to connect to the server"
            });

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="login-page">

            <div className="login-card">

                <div className="login-header">

                    <div className="login-icon">
                        🔐
                    </div>

                    <h1>Welcome Back</h1>

                    <p>
                        Login to continue to iNotebook
                    </p>

                </div>


                {authAlert.show && (

                    <div
                        className={`auth-alert ${authAlert.type}`}
                    >

                        <span>⚠</span>

                        <p>
                            {authAlert.message}
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                setAuthAlert({
                                    show: false,
                                    type: "",
                                    message: ""
                                })
                            }
                        >
                            ×
                        </button>

                    </div>
                )}


                <form onSubmit={handleSubmit}>

                    <div className="login-form-group">

                        <label htmlFor="email">
                            Email Address
                        </label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            autoComplete="email"
                            required
                        />

                        {errors.email && (

                            <div className="field-error">
                                {errors.email}
                            </div>
                        )}

                    </div>


                    <div className="login-form-group">

                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            required
                        />

                        {errors.password && (

                            <div className="field-error">
                                {errors.password}
                            </div>
                        )}

                    </div>


                    <button
                        type="submit"
                        className="login-submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"
                        }
                    </button>

                </form>


                <div className="login-footer">

                    <span>
                        Don't have an account?
                    </span>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/signup")
                        }
                    >
                        Create account
                    </button>

                </div>

            </div>

        </div>
    );
};

export default Login;