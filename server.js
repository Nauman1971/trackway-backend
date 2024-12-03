const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./config/db");
const authRoutes = require("./routes/auth");
const journeyRoutes = require("./routes/journey");

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/journey", journeyRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
