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
