const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Import routes
const newsRoutes = require("./routes/news");
const statsRoutes = require("./routes/stats");
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
app.use("/api", statsRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

// Auto-fetch news when server starts
const initializeNews = async () => {
  // Fetch news
  try {
    console.log("ðŸ“° Fetching initial news data...");
    const newsResponse = await axios.post(
      `http://localhost:${PORT}/api/news/fetch`
    );
    console.log("âœ… News data loaded:", newsResponse.data);
  } catch (error) {
    console.error("âŒ Failed to fetch news:");
    console.error("  Status:", error.response?.status);
    console.error("  Data:", error.response?.data);
    console.error("  Message:", error.message);
  }

  // Fetch stats
  try {
    console.log("ðŸ“Š Fetching initial stats data...");
    const statsResponse = await axios.post(
      `http://localhost:${PORT}/api/stats/fetch`
    );
    console.log("âœ… Stats data loaded:", statsResponse.data);
  } catch (error) {
    console.error("âŒ Failed to fetch stats:");
    console.error("  Status:", error.response?.status);
    console.error("  Data:", error.response?.data);
    console.error("  Message:", error.message);
  }

  // Delete old news
  try {
    console.log("ðŸ—‘ï¸ Deleting old news...");
    await axios.delete(`http://localhost:${PORT}/api/news/delete`);
    console.log("âœ… Cleanup complete!");
  } catch (error) {
    console.error(
      "âŒ Failed to delete old news:",
      error.response?.data || error.message
    );
  }
};

// Set up periodic updates (every 1 minute = 60000ms)
const startNewsSync = () => {
  setInterval(async () => {
    try {
      console.log("ðŸ”„ Syncing news...");
      await axios.post(`http://localhost:${PORT}/api/news/fetch`);
      await axios.post(`http://localhost:${PORT}/api/stats/fetch`);
      await axios.delete(`http://localhost:${PORT}/api/news/delete`);
      console.log("âœ… News synced successfully!");
    } catch (error) {
      console.error("âŒ Failed to sync news:", error.message);
    }
  }, 60000); // 60000ms = 1 minute
};

app.listen(PORT, async () => {
  console.log(`ðŸš€ Server running on http://localhost:${PORT}`);

  // Wait a bit for server to fully start
  setTimeout(async () => {
    await initializeNews();
    startNewsSync();
  }, 1000);
});
