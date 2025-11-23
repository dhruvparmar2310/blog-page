require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const blogRoutes = require("./routes/blogRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();
const PORT = process.env.PORT || 3050;

// DB Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// All Routes
app.use("/api", blogRoutes);
app.use("/api", commentRoutes);

// Error Handler
app.use((err, req, res, next) => {
    console.error('Error: ', err.stack);
    res.status(500).json({ success: false, message: 'Server Error' });
})

app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
