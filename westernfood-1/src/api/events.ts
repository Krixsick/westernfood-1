import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { type UpcomingEvents } from "./valorantTypes";

const apiClient = axios.create({
  baseURL: "http://localhost:3001/api",
});

const getUpcomingEvents = async () => {
  try {
    const response = await apiClient.get("/upcoming_events");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const useGetUpcomingEvents = () => {
  return useQuery({
    queryKey: ["upcoming_events"],
    queryFn: getUpcomingEvents,
  });
};
