import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useQueryClient } from "@tanstack/react-query";

import AppRoutes from "./routes/AppRoutes";
import {
  getCommunitySummary,
  getCommunityTypeSummary,
  getSectoralByRegion,
  getSectoralTrend,
  getTimeseries,
  getSectorByCommunityType,
} from "./services/http";
import { ghgKeys } from "./services/queryKeyFactory";

const theme = createTheme({
  palette: {
    primary: { main: "#1e293b" },
    secondary: { main: "#059669" },
    background: { default: "#f8fafc", paper: "#ffffff" },
  },
  typography: { fontFamily: "Inter, Roboto, sans-serif" },
});

function App() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const preloadQueries = async () => {
      try {
        await Promise.all([
          queryClient.prefetchQuery({
            queryKey: ghgKeys.communitySummary(),
            queryFn: getCommunitySummary,
            staleTime: 5 * 60 * 1000,
          }),
          queryClient.prefetchQuery({
            queryKey: ghgKeys.communityType(),
            queryFn: getCommunityTypeSummary,
            staleTime: 5 * 60 * 1000,
          }),
          queryClient.prefetchQuery({
            queryKey: ghgKeys.sectoralByRegion(),
            queryFn: getSectoralByRegion,
            staleTime: 5 * 60 * 1000,
          }),
          queryClient.prefetchQuery({
            queryKey: ghgKeys.sectoralTrend(),
            queryFn: getSectoralTrend,
            staleTime: 5 * 60 * 1000,
          }),
          queryClient.prefetchQuery({
            queryKey: ghgKeys.timeseries(),
            queryFn: getTimeseries,
            staleTime: 5 * 60 * 1000,
          }),
          queryClient.prefetchQuery({
            queryKey: ghgKeys.sectorByCommunityType(),
            queryFn: getSectorByCommunityType,
            staleTime: 5 * 60 * 1000,
          }),
        ]);
        console.log("API data preloaded.");
      } catch (error) {
        console.error("Preloading failed:", error);
      }
    };

    preloadQueries();
  }, [queryClient]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
