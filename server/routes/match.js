const axios = require("axios");
const { createClient } = require("@supabase/supabase-js");
const express = require("express");

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
const apiMatchClient = axios.create({
  baseURL: "https://vlrggapi.vercel.app",
});

router.post("/upcoming/fetch", async (req, res) => {
  try {
    const response = await apiMatchClient.get("/match", {
      params: {
        q: "upcoming",
      },
    });
    const { data, error } = await supabase
      .from("upcoming_matches")
      .upsert(
        response.data.data.segments.map((upcoming) => ({
          team1: upcoming.team1,
          team2: upcoming.team2,
          flag1: upcoming.flag1,
          flag2: upcoming.flag2,
          time_until_match: upcoming.time_until_match,
          match_series: upcoming.match_series,
          match_event: upcoming.match_event,
          unix_timestamp: upcoming.unix_timestamp,
          match_page: upcoming.match_page,
        }))
      )
      .select();
    if (error) {
      console.log(error);
      throw error;
    }
    res.json({
      success: true,
      count: response.length,
      message: "NA rankings fetched and stored successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch rankings",
      details: error.toString(),
    });
  }
});

router.get("/upcoming", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("upcoming_matches")
      .select("*")
      .limit(20);
    if (error) {
      console.log(error);
      throw error;
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

module.exports = router;
