import React, { useEffect, useState } from "react";
import { getHistoricalInr } from "../services/api";

export default function Portfolio({ userId, refresh }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (userId) {
      getHistoricalInr(userId).then(res => setHistory(res.data));
    }
  }, [userId, refresh]); // ✅ refresh comes from props

  return (
    <div className="card">
      <h3>Historical INR Value</h3>
      {history.length === 0 ? (
        <p>No history available yet.</p>
      ) : (
        <ul>
          {history.map(h => (
            <li key={h.date}>{h.date}: ₹{h.value.toFixed(2)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
