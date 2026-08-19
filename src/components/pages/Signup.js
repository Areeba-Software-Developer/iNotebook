import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import "./Signup.css";

const Signup = () => {

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        username: "",
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
    // PASSWORD VALIDATION
    // ===============================

    const validatePassword = (password) => {

        return password.length >= 8;
    };


    // ===============================
    // FIELD VALIDATION
    // ===============================

    const validateField = (name, value) => {

        let error = "";

        if (name === "username") {

            if (!value.trim()) {

                error = "Username is required";

            } else if (value.trim().length < 2) {

                error =
                    "Username must be at least 2 characters";
            }
        }


        if (name === "email") {

            if (!value.trim()) {

                error = "Email is required";

            } else if (!validateEmail(value)) {

                error =
                    "Please enter a valid email address";
            }
        }


        if (name === "password") {

            if (!value) {

                error = "Password is required";

            } else if (!validatePassword(value)) {

                error =
                    "Password must be at least 8 characters";
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
    // SIGNUP
    // ===============================

    const handleSubmit = async (e) => {

        e.preventDefault();

        const usernameValid = validateField(
            "username",
            credentials.username
        );

        const emailValid = validateField(
            "email",
            credentials.email
        );

        const passwordValid = validateField(
            "password",
            credentials.password
        );


        if (
            !usernameValid ||
            !emailValid ||
            !passwordValid
        ) {

            setAuthAlert({
                show: true,
                type: "error",
                message: "Please fix the highlighted errors"
            });

            return;
        }


        setLoading(true);


        try {

            const API_URL =
                process.env.REACT_APP_API_URL;

            if (!API_URL) {

                throw new Error(
                    "REACT_APP_API_URL is not defined"
                );
            }


            const response = await fetch(
                `${API_URL}/api/auth/signup`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        username:
                            credentials.username.trim(),

                        email:
                            credentials.email.trim(),

                        password:
                            credentials.password
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                const message =
                    data.error ||
                    (data.errors &&
                        data.errors[0]?.msg) ||
                    "Signup failed";

                throw new Error(message);
            }


            if (!data.authToken) {

                throw new Error(
                    "Authentication token was not received"
                );
            }


            login(data.authToken);


            setAuthAlert({
                show: true,
                type: "success",
                message:
                    "Account created successfully!"
            });


            setTimeout(() => {

                navigate("/");

            }, 500);


        } catch (error) {

            console.error(
                "Signup error:",
                error
            );

            setAuthAlert({
                show: true,
                type: "error",
                message:
                    error.message ||
                    "Unable to connect to the server"
            });

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="signup-page">

            <div className="signup-card">

                <div className="signup-header">

                    <div className="signup-icon">
                        📔
                    </div>

                    <h1>Create Account</h1>

                    <p>
                        Start organizing your notes
                        with iNotebook
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

                    <div className="signup-form-group">

                        <label htmlFor="username">
                            Username
                        </label>

                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            autoComplete="username"
                            required
                        />

                        {errors.username && (

                            <div className="field-error">
                                {errors.username}
                            </div>
                        )}

                    </div>


                    <div className="signup-form-group">

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


                    <div className="signup-form-group">

                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            autoComplete="new-password"
                            minLength="8"
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
                        className="signup-submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating account..."
                            : "Create Account"
                        }
                    </button>

                </form>


                <div className="signup-footer">

                    <span>
                        Already have an account?
                    </span>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/login")
                        }
                    >
                        Login
                    </button>

                </div>

            </div>

        </div>
    );
};

export default Signup;