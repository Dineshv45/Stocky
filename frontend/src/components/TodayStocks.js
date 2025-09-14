import React, { useEffect, useState } from "react";
import { getTodayStocks } from "../services/api";

export default function TodayStocks({ userId, refresh }) {
  const [rewards, setRewards] = useState([]);

useEffect(() => {
  getTodayStocks(userId).then(res => setRewards(res.data));
}, [userId, refresh]); 

  return (
    <div className="card">
      <h3>Today's Stocks</h3>
      {rewards.length === 0 ? (
        <p>No rewards yet today.</p>
      ) : (
        <ul>
          {rewards.map(r => (
            <li key={r._id}>
              {r.stockSymbol} - {r.shares} shares @{" "}
              {new Date(r.rewardedAt).toLocaleTimeString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
