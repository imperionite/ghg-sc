// Usage Guide
// profile: () => [...userKeys.all, "profile"]. It generates consistent keys ["users", "profile"]
// usage: queryClient.invalidateQueries({ queryKey: userKeys.profile() });  OR
// usage: queryClient.refetchQueries({ queryKey: userKeys.profile() });
// use if for example When you’re fetching only the current user’s data (/api/me), don't need to know any specific identifier
// userKeys.detail(id)	Any user’s data by ID	["users", "detail", "abc123"]	When fetching another user (or even current user via /api/users/{id})

export const userKeys = {
  all: ["users"],
  lists: () => [...userKeys.all, "list"],
  details: (id) => [...userKeys.all, "detail", id],
  profile: () => [...userKeys.all, "profile"],
  detail: (id) => [...userKeys.all, "detail", id],
};

export const ghgKeys = {
  all: ["ghg"],
  communitySummary: () => [...ghgKeys.all, "community-summary"],
  sectoralByRegion: () => [...ghgKeys.all, "sectoral-by-region"],
  communityType: () => [...ghgKeys.all, "community-type"],
  sectoralTrend: () => [...ghgKeys.all, "sectoral-trend"],
  timeseries: () => [...ghgKeys.all, "timeseries"],
  regionalTrends: (regions) => [
    ...ghgKeys.all,
    "regional-trends",
    regions.slice().sort().join(","),
  ],
  sectorByCommunityType: () => [...ghgKeys.all, "sectoral-by-community-type"],
  // user-specific submissions keys:
  // key for fetching all submissions by a specific user.
  userSubmissions: (userId) => [...ghgKeys.all, "user-submissions", userId],
  // key for fetching a specific submission by a user.
  userSubmissionById: (userId, submissionId) => [
    ...ghgKeys.all,
    "user-submissions",
    userId,
    submissionId,
  ],
};
