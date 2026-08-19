require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectToMongo = require("./db");

const app = express();

connectToMongo();

app.use(cors({
    origin: "http://localhost:3000"
}));

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.get("/", (req, res) => {
    res.send("iNotebook Backend is running");
});

app.listen(5000, () => {
    console.log("Backend running on port 5000");
});