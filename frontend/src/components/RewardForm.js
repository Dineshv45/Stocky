import React, { useState } from "react";
import { addReward } from "../services/api";

export default function RewardForm({ userId, onRewardAdded }) {
  const [stock, setStock] = useState("");
  const [shares, setShares] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addReward({ userId, stock, shares: parseFloat(shares) });
    setStock("");
    setShares("");
    onRewardAdded(); 
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Add Reward</h3>
      <input
        type="text"
        placeholder="Stock Symbol (e.g. RELIANCE)"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        required
      />
      <input
        type="number"
        step="0.01"
        placeholder="Shares"
        value={shares}
        onChange={(e) => setShares(e.target.value)}
        required
      />
      <button type="submit">Add Reward</button>
    </form>
  );
}
