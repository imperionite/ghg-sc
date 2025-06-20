// src/pages/PublicInsights.jsx
import React, { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import RegionalTrendsChart from "../components/charts/RegionalTrendsChart";
import EmissionsByCommunityTypeChart from "../components/charts/EmissionsByCommunityTypeChart";
import SectorByCommunityTypeChart from "../components/charts/SectorByCommunityTypeChart";

const chartComponents = [
  {
    label: "Regional Trends",
    component: <RegionalTrendsChart />,
  },
  {
    label: "Emissions by Community Type",
    component: <EmissionsByCommunityTypeChart />,
  },
  {
    label: "Sector by Community Type",
    component: <SectorByCommunityTypeChart />,
  },
];

export default function PublicInsights() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box className="w-full px-4 md:px-10 py-6">
      <Typography variant="h4" className="mb-6 font-bold">
        Public Climate Insights
      </Typography>

      <Tabs
        value={tabIndex}
        onChange={(e, newValue) => setTabIndex(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        className="mb-6"
      >
        {chartComponents.map((tab, idx) => (
          <Tab key={idx} label={tab.label} />
        ))}
      </Tabs>

      <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {chartComponents[tabIndex].component}
      </Box>
    </Box>
  );
}
