import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  stockSymbol: String,
  shares: { type: Number },
  rewardedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Reward", rewardSchema);
