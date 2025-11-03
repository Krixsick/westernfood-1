import axios from "axios";
import { type UpcomingMatch } from "./valorantTypes";
import { useQuery } from "@tanstack/react-query";
const apiClient = axios.create({
  baseURL: "http://localhost:3001/api",
});

const getUpcomingMatches = async (): Promise<UpcomingMatch[]> => {
  try {
    const response = await apiClient.get("/upcoming");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useGetUpcomingMatches = () => {
  return useQuery({
    queryKey: ["upcoming_matches"],
    queryFn: getUpcomingMatches,
  });
};
