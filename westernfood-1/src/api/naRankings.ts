import {
  useQuery,
  useMutation,
  useQueryClient,
  useQueries,
} from "@tanstack/react-query";
import { type TeamRankings } from "./valorantTypes";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3001/api",
});

const getNaTeamRankings = async (): Promise<TeamRankings[]> => {
  try {
    const response = await apiClient.get("/na_rankings");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const useGetNaTeamRankings = () => {
  return useQuery({
    queryKey: ["na_Rankings"],
    queryFn: getNaTeamRankings,
  });
};
