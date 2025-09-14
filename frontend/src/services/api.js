import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000"
});

export const addReward = (data) => API.post("/reward", data);
export const getTodayStocks = (userId) => API.get(`/reward/today-stocks/${userId}`);
export const getHistoricalInr = (userId) => API.get(`/reward/historical-inr/${userId}`);
export const getStats = (userId) => API.get(`/reward/stats/${userId}`);
