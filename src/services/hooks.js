import { useQuery } from "@tanstack/react-query";

import { userKeys } from "./queryKeyFactory";
import { getUserProfile } from "./http";

export const useUserProfile = (accessToken) => {
  return useQuery({
    queryKey: userKeys.detail("profile"), 
    queryFn: getUserProfile,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    enabled: !!accessToken,
  });
};
