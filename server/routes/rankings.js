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
        const {data, error} = await supabase.from("")
    }
}