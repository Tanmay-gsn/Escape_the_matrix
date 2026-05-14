const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());  // to read incoming JSON data
const scoreRoutes = require("./routes/scores");
app.use("/api/scores", scoreRoutes);
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

const connectDB = async () => {
  try {
    // This looks for MONGO_URI in your .env file
    await mongoose.connect(process.env.MONGO_URI);
    console.log("My URI is: ",process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

connectDB();
let port = 5000;

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})

app.get("/api/health",(req,res) => {
    res.json({status:"ok"});
})
