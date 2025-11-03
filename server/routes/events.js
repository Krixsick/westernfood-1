const express = require("express");
const axios = require("axios");
const { createClient } = require("@supabase/supabase-js");

const router = express.Router();
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
const apiClient = axios.create({
  baseURL: "https://vlrggapi.vercel.app",
});

router.post("/upcoming_events/fetch", async (req, res) => {
  try {
    const response = await apiClient.get("/events", {
      params: {
        q: "upcoming",
      },
    });
    const { data, error } = await supabase
      .from("upcoming_events")
      .upsert(
        response.data.data.segments.map((event) => ({
          title: event.title,
          status: event.status,
          prize: event.prize,
          dates: event.dates,
          region: event.region,
          thumb: event.thumb,
          url_path: event.url_path,
        }))
      )
      .select();
    if (error) {
      console.log(error);
      throw error;
    }
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch upcoming events",
      details: error.toString(),
    });
  }
});

router.get("/upcoming_events", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("upcoming_events")
      .select("*")
      .limit(10);
    if (error) {
      console.log(error);
      throw error;
    }
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch upcoming events",
      details: error.toString(),
    });
  }
});

module.exports = router;
