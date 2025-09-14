import mongoose from "mongoose";

const ledgerSchema = new mongoose.Schema({
  rewardId: { type: mongoose.Schema.Types.ObjectId, ref: "Reward" },
  entryType: { type: String, enum: ["STOCK_UNITS", "CASH_OUTFLOW", "FEES"] },
  amount: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Ledger", ledgerSchema);
