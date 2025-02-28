import { useQuery, keepPreviousData } from "@tanstack/react-query";
import api from "../api";

export const usePosts = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["posts", page, limit],
    queryFn: async () => {
      const { data } = await api.get(`/post?page=${page}&limit=${limit}`);
      return data;
    },
    placeholderData: keepPreviousData,
  });
};
