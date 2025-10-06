const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();
//import connectDB from './config/db.js';
const connectDB = require('./config/db.js');

const authRoutes = require("./routes/authRoutes");
const trialRoutes = require("./routes/trialRoutes");
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/trials", trialRoutes);

// // DB Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
