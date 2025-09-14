import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import rewardRoutes from "./routes/rewardRoutes.js";
import { startPriceUpdater } from "./utils/priceUpdater.js";

dotenv.config();

const app = express();  
// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/reward", rewardRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    startPriceUpdater(); 
  })
  .catch(err => console.error("MongoDB Error:", err));

// Root test route
app.get("/", (req, res) => {
  res.send("Stocky Backend API running ");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
