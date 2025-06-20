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
};



