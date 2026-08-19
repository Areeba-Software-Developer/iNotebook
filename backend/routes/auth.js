const express = require("express");
const router = express.Router();

const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// ===============================
// SIGNUP
// POST /api/auth/signup
// ===============================

router.post(
    "/signup",

    [
        body("username")
            .trim()
            .isLength({ min: 2, max: 30 })
            .withMessage("Username must be between 2 and 30 characters"),

        body("email")
            .trim()
            .isEmail()
            .withMessage("Please provide a valid email"),

        body("password")
            .isLength({ min: 8 })
            .withMessage("Password must be at least 8 characters")
    ],

    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        try {

            const { username, email, password } = req.body;

            // Check if user already exists
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).json({
                    error: "User already exists"
                });
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);

            const hashedPassword = await bcrypt.hash(
                password,
                salt
            );

            // Create user
            const user = new User({
                username,
                email,
                password: hashedPassword
            });

            const savedUser = await user.save();

            // Create JWT
            const payload = {
                user: {
                    id: savedUser._id.toString()
                }
            };

            const authToken = jwt.sign(
                payload,
                JWT_SECRET
            );

            return res.status(201).json({
                authToken,
                user: {
                    id: savedUser._id,
                    username: savedUser.username,
                    email: savedUser.email
                }
            });

        } catch (error) {

            console.error("SIGNUP ERROR:", error);

            return res.status(500).json({
                error: "Internal Server Error"
            });
        }
    }
);


// ===============================
// LOGIN
// POST /api/auth/login
// ===============================

router.post(
    "/login",

    [
        body("email")
            .trim()
            .isEmail()
            .withMessage("Please provide a valid email"),

        body("password")
            .notEmpty()
            .withMessage("Password is required")
    ],

    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        try {

           const { email, password } = req.body;

console.log("LOGIN EMAIL:", email);
console.log("DB NAME:", User.db.name);
console.log("COLLECTION:", User.collection.name);

const allUsers = await User.find({}).select("username email");

console.log("ALL USERS:", allUsers);

const user = await User.findOne({
    email: email.trim()
});

console.log("USER FOUND:", user);
            // Compare entered password with bcrypt hash
           const passwordMatch = await bcrypt.compare(
    password,
    user.password
);

console.log("PASSWORD MATCH:", passwordMatch);

if (!passwordMatch) {
    return res.status(400).json({
        error: "Password does not match"
    });
}

            // Create JWT
            const payload = {
                user: {
                    id: user._id.toString()
                }
            };

            const authToken = jwt.sign(
                payload,
                JWT_SECRET
            );

            return res.status(200).json({
                authToken,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
            });

        } catch (error) {

            console.error("LOGIN ERROR:", error);

            return res.status(500).json({
                error: "Internal Server Error"
            });
        }
    }
);


module.exports = router;