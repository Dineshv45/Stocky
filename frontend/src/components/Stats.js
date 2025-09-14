import React, { useEffect, useState } from "react";
import { getStats } from "../services/api";
import {
  PieChart, Pie, Tooltip, ResponsiveContainer, Cell
} from "recharts";

const COLORS = ["#0d6efd", "#dc3545", "#198754", "#ffc107", "#6f42c1"];

export default function Stats({ userId, refresh }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (userId) {
      getStats(userId).then(res => setStats(res.data));
    }
  }, [userId, refresh]);

  if (!stats) {
    return (
      <div className="card">
        <h3>Portfolio Stats</h3>
        <div className="skeleton"></div>
        <div className="skeleton"></div>
      </div>
    );
  }

  // Transform todayShares into chart data
  const chartData = Object.entries(stats.todayShares).map(([stock, shares]) => ({
    stock,
    value: shares
  }));

  return (
    <div className="card">
      <h3>Portfolio Stats</h3>
      <p><strong>Portfolio Value:</strong> ₹{stats.portfolioValueINR.toFixed(2)}</p>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="stock"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p>No shares rewarded today.</p>
      )}
    </div>
  );
}
