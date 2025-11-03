import type { JSX } from "react/jsx-runtime";

export interface NewsArticle {
  id: number;
  title: string;
  description: string;
  author: string;
  date: string;
  url_path: string;
  created_at: string;
  updated_at: string;
}

export interface PlayerStats {
  id?: number; // Optional for inserts
  player: string;
  org: string;
  agents: string[];
  rounds_played: number; // 220
  rating: number; // 1.32
  average_combat_score: number; // 257.3
  kill_deaths: number; // 1.44
  kill_assists_survived_traded: number; // 75 (not "75%")
  average_damage_per_round: number; // 165.6
  kills_per_round: number; // 0.93
  assists_per_round: number; // 0.28
  first_kills_per_round: number; // 0.16
  first_deaths_per_round: number; // 0.08
  headshot_percentage: number; // 27 (not "27%")
  clutch_success_percentage: number; // 28 (not "28%")
  created_at?: string; // Timestamps from DB
  updated_at?: string;
}

export interface TeamRankings {
  id: number;
  rank: number;
  team: string; // "NRG"
  country: string; // "United States"
  last_played: string; // "24d ago"
  last_played_team: string; // "vs. FNATIC"
  last_played_team_logo: string; // "//owcdn.net/img/62a40cc2b5e29.png"
  record: string; // "36–18"
  earnings: string; // "$2,000,500"
}

export interface UpcomingMatch {
  team1: string; // "TBD" or team name
  team2: string; // "TBD" or team name
  flag1: string; // "flag_un" or country flag
  flag2: string; // "flag_un" or country flag
  time_until_match: string; // "6d 7h from now"
  match_series: string; // "Main Event: Grand Final"
  match_event: string; // "Predator League 2026: Japan"
  unix_timestamp: string; // "2025-11-09 07:30:00"
  match_page: string; // "https://www.vlr.gg/579985/..."
}

export interface LiveMatch {
  team1: string;
  team2: string;
  flag1: string;
  flag2: string;
  team1_logo: string;
  team2_logo: string;
  score1: string;
  score2: string;
  team1_round_ct: string;
  team1_round_t: string;
  team2_round_ct: string;
  team2_round_t: string;
  map_number: string;
  current_map: string;
  time_until_match: string; // "LIVE"
  match_event: string;
  match_series: string;
  unix_timestamp: string;
  match_page: string;
}

export interface MatchResult {
  team1: string;
  team2: string;
  score1: string;
  score2: string;
  flag1: string;
  flag2: string;
  time_completed: string; // "2h 44m ago"
  round_info: string;
  tournament_name: string;
  match_page: string;
  tournament_icon: string;
}

export interface UpcomingEvents {
  id: number;
  title: string; // "VCT 2026: Americas Kickoff"
  status: string; // "upcoming", "ongoing", "completed"
  prize: string; // "$0" or "$100,000"
  dates: string; // "Jan 1 - Jan 15" or empty string
  region: string; // "us", "eu", "kr", etc.
  thumb: string; // "https://owcdn.net/img/640f5ab71dfbb.png"
  url_path: string; // "https://www.vlr.gg/event/2682/vct-2026-americas-kickoff"
  created_at?: string; // Timestamp from DB
  updated_at?: string; // Timestamp from DB
}
