const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const leadRoutes = require("./routes/leadRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use(cors());
app.use(express.json());
app.use("/api/leads", leadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("API Running");
});

app.listen(5000, () => console.log("Server running on port 5000"));