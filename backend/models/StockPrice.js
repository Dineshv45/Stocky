import mongoose from "mongoose";

const stockPriceSchema = new mongoose.Schema({
  stockSymbol: String,
  price: Number,
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.model("StockPrice", stockPriceSchema);
