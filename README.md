A full-stack web application to track stock rewards, portfolio performance, and statistics.
Built with React (frontend), Node.js + Express (backend), and MongoDB Atlas (database).

🚀 Features

📊 Dashboard with portfolio overview
💰 Real-time stock rewards tracking
🥧 Interactive pie chart showing stock distribution
🌐 Deployed Backend on Render (Node.js + MongoDB Atlas)
⚡ Deployed Frontend on Vercel (React)

Tech Stack
Frontend: React, React Router, Axios, Chart.js
Backend: Node.js, Express, Mongoose
Database: MongoDB Atlas
Deployment: Render (backend), Vercel (frontend)


stocky/
│── backend/          # Express + MongoDB API
│   ├── models/       # Mongoose schemas
│   ├── routes/       # Express routes
│   ├── server.js     # App entry point
│   └── priceUpdater.js
│
│── frontend/         # React app
│   ├── public/
│   ├── src/
│   │   ├── components/   # Navbar, Stats, Portfolio
│   │   ├── pages/        # Home, Dashboard
│   │   ├── services/     # Axios API setup
│   │   └── App.js
│   └── package.json
│
└── README.md



Setup Instructions
1. Clone Repo
git clone https://github.com/yourusername/Stocky.git
cd Stocky

2. Backend Setup
  cd backend
  npm install
  Create a .env file:
  MONGO_URI=your_mongodb_atlas_connection_string
  PORT=5000
Run backend :
  cd backend
  npm start

3.Frontend Setup
  cd ../frontend
  npm install
  npm start


 
