import express from "express";
import Reward from "../models/Reward.js";
import Ledger from "../models/Ledger.js";
import StockPrice from "../models/StockPrice.js";

const router = express.Router();

// POST /reward
router.post("/", async (req, res) => {
  try {
    const { userId, stock, shares, timestamp } = req.body;

    const reward = new Reward({
      userId,
      stockSymbol: stock,
      shares,
      rewardedAt: timestamp || new Date()
    });
    await reward.save();

    // Ledger entries
    await Ledger.create({ rewardId: reward._id, entryType: "STOCK_UNITS", amount: shares });
    await Ledger.create({ rewardId: reward._id, entryType: "CASH_OUTFLOW", amount: 100 }); // mock
    await Ledger.create({ rewardId: reward._id, entryType: "FEES", amount: 10 }); // mock

    res.json({ message: "Reward recorded successfully", reward });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /today-stocks/:userId
router.get("/today-stocks/:userId", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const rewards = await Reward.find({
      userId: req.params.userId,
      rewardedAt: { $gte: today }
    });
    res.json(rewards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /historical-inr/:userId
router.get("/historical-inr/:userId", async (req, res) => {
  try {
    const rewards = await Reward.find({ userId: req.params.userId });
    const stockPrices = await StockPrice.find();

    // group by date
    const history = {};
    rewards.forEach(r => {
      const date = r.rewardedAt.toISOString().split("T")[0];
      const priceObj = stockPrices.find(s => s.stockSymbol === r.stockSymbol);
      const price = priceObj ? priceObj.price : 1000;
      history[date] = (history[date] || 0) + (r.shares * price);
    });

    res.json(Object.entries(history).map(([date, value]) => ({ date, value })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /stats/:userId
router.get("/stats/:userId", async (req, res) => {
  try {
    const rewards = await Reward.find({ userId: req.params.userId });
    const stockPrices = await StockPrice.find();

    // today's shares
    const today = new Date();
    today.setHours(0,0,0,0);
    const todayRewards = rewards.filter(r => r.rewardedAt >= today);
    const todayShares = {};
    todayRewards.forEach(r => {
      todayShares[r.stockSymbol] = (todayShares[r.stockSymbol] || 0) + r.shares;
    });

    // portfolio value
    let totalValue = 0;
    rewards.forEach(r => {
      const priceObj = stockPrices.find(s => s.stockSymbol === r.stockSymbol);
      const price = priceObj ? priceObj.price : 1000;
      totalValue += r.shares * price;
    });

    res.json({
      todayShares,
      portfolioValueINR: totalValue
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
