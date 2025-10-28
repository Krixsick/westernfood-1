import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { type NewsArticle } from "./valorantTypes";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3001/api",
});

// Fetch news from your backend (which reads from Supabase)
const getValorantNews = async (): Promise<NewsArticle[]> => {
  const response = await apiClient.get("/news");
  return response.data;
};

// Hook to display news
export const useGetValorantNews = () => {
  return useQuery({
    queryKey: ["valorant-news"],
    queryFn: getValorantNews,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};
