import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { type PlayerStats } from "./valorantTypes";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3001/api",
});

const getStats = async (): Promise<PlayerStats[]> => {
  try {
    const response = await apiClient.get("/stats");
    return response.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export const useGetStats = () => {
  return useQuery({
    queryKey: ["pro-player-stats"],
    queryFn: getStats,
    staleTime: 5 * 60 * 1000,
  });
};
