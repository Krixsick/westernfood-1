const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Import routes
const newsRoutes = require("./routes/news");

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api", newsRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

// Auto-fetch news when server starts
const initializeNews = async () => {
  try {
    console.log("📰 Fetching initial news data...");
    await axios.post(`http://localhost:${PORT}/api/news/fetch`);
    await axios.delete(`http://localhost:${PORT}/api/news/delete`);
    console.log("✅ Initial news data loaded!");
  } catch (error) {
    console.error("❌ Failed to fetch initial news:", error.message);
  }
};

// Set up periodic updates (every 1 minute = 60000ms)
const startNewsSync = () => {
  setInterval(async () => {
    try {
      console.log("🔄 Syncing news...");
      await axios.post(`http://localhost:${PORT}/api/news/fetch`);
      await axios.delete(`http://localhost:${PORT}/api/news/delete`);
      console.log("✅ News synced successfully!");
    } catch (error) {
      console.error("❌ Failed to sync news:", error.message);
    }
  }, 60000); // 60000ms = 1 minute
};

app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);

  // Wait a bit for server to fully start
  setTimeout(async () => {
    await initializeNews();
    startNewsSync();
  }, 1000);
});
