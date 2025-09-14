// utils/priceUpdater.js
import StockPrice from "../models/StockPrice.js";

// Mock stock list
const STOCKS = ["RELIANCE", "TCS", "INFOSYS", "HDFCBANK", "WIPRO"];

// Generate random price for a stock
function randomPrice() {
  return (Math.random() * (4000 - 500) + 500).toFixed(2); // range 500 - 4000
}

// Update prices every hour
export async function updateStockPrices() {
  try {
    for (const symbol of STOCKS) {
      const price = parseFloat(randomPrice());
      await StockPrice.findOneAndUpdate(
        { stockSymbol: symbol },
        { price, lastUpdated: new Date() },
        { upsert: true, new: true }
      );
    }
    console.log(" Stock prices updated");
  } catch (err) {
    console.error(" Error updating stock prices:", err);
  }
}

// Schedule hourly update
export function startPriceUpdater() {
  updateStockPrices(); // initial run
  setInterval(updateStockPrices, 60 * 60 * 1000); // every 1h
}
