import { useQuery } from "@tanstack/react-query";

import { userKeys, ghgKeys } from "./queryKeyFactory";
import {
  getUserProfile,
  getCommunitySummary,
  getCommunityTypeSummary,
  getSectoralByRegion,
  getSectoralTrend,
  getTimeseries,
  getSectorByCommunityType,
} from "./http";

export const useUserProfile = (access) => {
  return useQuery({
    queryKey: userKeys.detail(access?.id),
    queryFn: getUserProfile,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    enabled: !!access,
  });
};

export const useCommunitySummary = () => {
  return useQuery({
    queryKey: ghgKeys.communitySummary(),
    queryFn: getCommunitySummary,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export const useCommunityTypeSummary = () => {
  return useQuery({
    queryKey: ghgKeys.communityType(),
    queryFn: getCommunityTypeSummary,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export const useSectoralByRegion = () => {
  return useQuery({
    queryKey: ghgKeys.sectoralByRegion(),
    queryFn: getSectoralByRegion,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export const useSectoralTrend = () => {
  return useQuery({
    queryKey: ghgKeys.sectoralTrend(),
    queryFn: getSectoralTrend,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export const useTimeseries = () => {
  return useQuery({
    queryKey: ghgKeys.timeseries(),
    queryFn: getTimeseries,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};


export const useSectoralByCommunityType = () => {
  return useQuery({
    queryKey: ghgKeys.sectorByCommunityType(),
    queryFn: getSectorByCommunityType,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
