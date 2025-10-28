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

// Trigger backend to fetch fresh news from Valorant API
const fetchFreshNews = async () => {
  const response = await apiClient.post("/news/fetch");
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

// Hook to manually refresh news from Valorant API
export const useFetchFreshNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchFreshNews,
    onSuccess: () => {
      // Refresh the news list after fetching
      queryClient.invalidateQueries({ queryKey: ["valorant-news"] });
    },
  });
};
