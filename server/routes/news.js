const express = require("express");
const axios = require("axios");
const { createClient } = require("@supabase/supabase-js");
const router = express.Router();

// Create clients
const newsApiClient = axios.create({
  baseURL: "https://vlrggapi.vercel.app",
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Fetch from Valorant API and store in Supabase
const fetchAndStoreNews = async () => {
  try {
    const response = await newsApiClient.get("/news");

    // Insert into database (use upsert to avoid duplicates)
    const { data, error } = await supabase
      .from("news_articles")
      .upsert(
        response.data.data.segments.map((a) => ({
          title: a.title,
          description: a.description,
          author: a.author,
          date: a.date,
          url_path: a.url_path,
        })),
        { onConflict: "url_path" } // Prevent duplicates based on url_path
      )
      .select();

    if (error) {
      console.error("Error inserting news:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching from Valorant API:", error);
    throw error;
  }
};

// POST /api/news/fetch - Fetch fresh news from Valorant API
router.post("/news/fetch", async (req, res) => {
  try {
    const data = await fetchAndStoreNews();
    res.json({
      success: true,
      count: data.length,
      message: "News fetched and stored",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// GET /api/news - Get news from Supabase database
router.get("/news", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("news_articles")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      console.error("Error fetching news from Supabase:", error);
      return res
        .status(500)
        .json({ error: "Failed to fetch news from database" });
    }

    res.json(data);
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Deleting valorant news
router.delete("/news", async (req, res) => {
  try {
    const fiveDays = new Date();
    fiveDays.setDate(fiveDays.getDate() - 5);

    const { data, error } = await supabase
      .from("news_articles")
      .delete()
      .lt("date", fiveDays.toISOString); //lt -> less than

    if (error) {
      console.log("Error deleting data from Supabase:", error);
    }
    res.json(data);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
