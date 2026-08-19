import React, { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./pages/Auth.css";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="auth-page">

            <div className="auth-container">

                {/* REGISTER FORM */}
                <div
                    className={`auth-form auth-register-form ${
                        isLogin ? "hidden" : "visible"
                    }`}
                >
                    <Signup />
                </div>


                {/* LOGIN FORM */}
                <div
                    className={`auth-form auth-login-form ${
                        isLogin ? "visible" : "hidden"
                    }`}
                >
                    <Login />
                </div>


                {/* SLIDING BLUE PANEL */}
                <div
                    className={`auth-slider ${
                        isLogin
                            ? "login-position"
                            : "register-position"
                    }`}
                >

                    <h2>
                        {isLogin
                            ? "Welcome Back!"
                            : "Hello, Welcome!"}
                    </h2>

                    <p>
                        {isLogin
                            ? "Don't have an account?"
                            : "Already have an account?"}
                    </p>

                    <button
                        type="button"
                        className="auth-switch-btn"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? "Register" : "Login"}
                    </button>

                </div>

            </div>

        </div>
    );
};

export default AuthPage;