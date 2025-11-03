const express = require("express");
const axios = require("axios");
const { createClient } = require("@supabase/supabase-js");

const router = express.Router();
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const apiRankingsClient = axios.create({
  baseURL: "https://vlrggapi.vercel.app",
});

const getValorantRankings = async () => {
  try {
    const response = await apiRankingsClient.get("/rankings", {
      params: {
        region: "na",
      },
    });
    const { data, error } = await supabase
      .from("na_team_rankings")
      .upsert(
        response.data.data.map((team) => ({
          rank: parseInt(team.rank),
          team: team.team,
          country: team.country,
          last_played: team.last_played,
          last_played_team: team.last_played_team,
          last_played_team_logo: team.last_played_team_logo,
          record: team.record,
          earnings: team.earnings,
        })),
        { onConflict: "team" }
      )
      .select();
    if (error) {
      console.log(error);
      throw error;
    }
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

router.post("/na_rankings/fetch", async (req, res) => {
  try {
    const response = await getValorantRankings();
    res.json({
      success: true,
      count: response.length,
      message: "NA rankings fetched and stored successfully",
      response,
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

router.get("/na_rankings", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("na_team_rankings")
      .select("*")
      .order("rank", { ascending: true })
      .limit(25);
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        error: "Failed to fetch rankings from database",
      });
    }
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

module.exports = router;
