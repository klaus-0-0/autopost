// src/index.js (backend)
const express = require("express");
const cors = require("cors");
const aiRoutes = require("./openAi"); // This should contain both /chat and /twitter routes
const auth = require("./auth")
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

// Use all routes from openAi.js under /api
app.use("/api", aiRoutes);
app.use("/api", auth);

// Basic route
app.get("/", (req, res) => {
    res.send("Social Media Scheduler API is running!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;