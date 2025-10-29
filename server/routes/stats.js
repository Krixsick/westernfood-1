const express = require("express");
const axios = require("axios");
const { createClient } = require("@supabase/supabase-js");
const router = express.Router();

const statsApiClient = axios.create({
  baseURL: "https://vlrggapi.vercel.app",
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const parsePercentage = (percentStr) => {
  return parseInt(percentStr.replace("%", ""));
};

const parseDecimal = (decimalStr) => {
  return parseFloat(decimalStr);
};

const fetchAndStoreStats = async () => {
  try {
    console.log("📊 Fetching stats from VLR API...");

    // ✅ Add required query parameters
    const response = await statsApiClient.get("/stats", {
      params: {
        region: "na", // Options: na, eu, ap, sa, jp, oce, mn, gc, br, latam, lan, las, kr, cn
        timespan: "30", // Options: 30, 60, 90, all
      },
    });

    if (!response.data || !response.data.data || !response.data.data.segments) {
      throw new Error("Invalid API response structure");
    }

    console.log(
      `📊 Got ${response.data.data.segments.length} players from API`
    );

    const { data, error } = await supabase
      .from("pro_stats")
      .upsert(
        response.data.data.segments.map((person) => ({
          player: person.player,
          org: person.org,
          agents: person.agents,
          rounds_played: parseInt(person.rounds_played),
          rating: parseDecimal(person.rating),
          average_combat_score: parseDecimal(person.average_combat_score),
          kill_deaths: parseDecimal(person.kill_deaths),
          kill_assists_survived_traded: parsePercentage(
            person.kill_assists_survived_traded
          ),
          average_damage_per_round: parseDecimal(
            person.average_damage_per_round
          ),
          kills_per_round: parseDecimal(person.kills_per_round),
          assists_per_round: parseDecimal(person.assists_per_round),
          first_kills_per_round: parseDecimal(person.first_kills_per_round),
          first_deaths_per_round: parseDecimal(person.first_deaths_per_round),
          headshot_percentage: parsePercentage(person.headshot_percentage),
          clutch_success_percentage: parsePercentage(
            person.clutch_success_percentage
          ),
        })),
        { onConflict: "player" }
      )
      .select();

    if (error) {
      console.error("❌ Supabase error:", error);
      throw error;
    }

    console.log(`✅ Successfully upserted ${data.length} player stats`);
    return data;
  } catch (error) {
    console.error("❌ Error in fetchAndStoreStats:", error.message);
    if (error.response) {
      console.error("❌ API Status:", error.response.status);
      console.error(
        "❌ API Error Response:",
        JSON.stringify(error.response.data, null, 2)
      );
    }
    throw error;
  }
};

router.post("/stats/fetch", async (req, res) => {
  try {
    const data = await fetchAndStoreStats();
    res.json({
      success: true,
      count: data.length,
      message: "Stats fetched and stored successfully",
      data,
    });
  } catch (error) {
    console.error("❌ Error in POST /stats/fetch:", error.message);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch stats",
      details: error.toString(),
    });
  }
});

router.get("/stats", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("pro_stats")
      .select("*")
      .order("rating", { ascending: false })
      .limit(100);

    if (error) {
      console.error("❌ Error getting stats:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to fetch stats from database",
      });
    }

    res.json(data);
  } catch (error) {
    console.error("❌ Error in GET /stats:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

module.exports = router;
