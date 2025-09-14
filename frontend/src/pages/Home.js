import React from "react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Example mock portfolio growth
const mockData = [
  { date: "Day 1", value: 5000 },
  { date: "Day 2", value: 7200 },
  { date: "Day 3", value: 6900 },
  { date: "Day 4", value: 8500 },
  { date: "Day 5", value: 9300 }
];

export default function Home() {
  return (
    <div className="page">
      {/* Hero Section */}
      <h2>Welcome to Stocky 📊</h2>
      <p>
        Stocky is a new kind of rewards program — instead of coins or cashback,
        you earn <strong>real shares of Indian companies</strong> like Reliance, TCS, and Infosys!
      </p>

      {/* How it Works */}
      <h3>How it works:</h3>
      <ul>
        <li>🎁 Earn shares when you onboard, refer, or hit milestones</li>
        <li>📈 Watch your rewards grow with real stock prices</li>
        <li>💰 Track your total portfolio worth in INR</li>
      </ul>

      {/* Portfolio Chart */}
      <h3>Example Portfolio Growth</h3>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#007bff" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Call to Action */}
      <div style={{ marginTop: "20px" }}>
        <Link to="/dashboard">
          <button>Go to Dashboard 🚀</button>
        </Link>
      </div>
    </div>
  );
}
