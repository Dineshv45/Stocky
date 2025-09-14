import React, { useState } from "react";
import RewardForm from "../components/RewardForm";
import TodayStocks from "../components/TodayStocks";
import Stats from "../components/Stats";
import Portfolio from "../components/Portfolio";

export default function Dashboard() {
  const userId = "650e3b1f8a7c5f0012345678"; // replace with real userId from DB
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="page">
      <h2>Dashboard</h2>
      <RewardForm userId={userId} onRewardAdded={() => setRefresh(!refresh)} />
      <TodayStocks userId={userId} refresh={refresh} />
      <Stats userId={userId} refresh={refresh} />
      <Portfolio userId={userId} refresh={refresh} />
    </div>
  );
}
