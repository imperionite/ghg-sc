import React, { useState } from "react";
import {
  Container, Typography, Box, Grid, FormControl, InputLabel, Select,
  MenuItem, OutlinedInput, Checkbox, ListItemText
} from "@mui/material";

import RegionalTrendsChart from "../components/charts/RegionalTrendsChart";
import SectorByCommunityTypeChart from "../components/charts/SectorByCommunityTypeChart";
import { staticRegions } from "../services/staticVars";

export default function PublicCharts() {
  const [selectedRegions, setSelectedRegions] = useState([]);

  const handleRegionChange = (event) => {
    const { value } = event.target;
    setSelectedRegions(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Container maxWidth="xl" className="py-8">
      <Typography variant="h5" className="font-semibold mb-4">
        📊 Public Community Greenhouse Gas (GHG) Insights
      </Typography>

      <Box className="mb-6">
        <FormControl className="min-w-[300px]">
          <InputLabel id="region-multi-select-label">Filter by Region</InputLabel>
          <Select
            labelId="region-multi-select-label"
            multiple
            value={selectedRegions}
            onChange={handleRegionChange}
            input={<OutlinedInput label="Filter by Region" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {staticRegions.map((region) => (
              <MenuItem key={region} value={region}>
                <Checkbox checked={selectedRegions.includes(region)} />
                <ListItemText primary={region} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <RegionalTrendsChart filterRegions={selectedRegions} />
        </Grid>
        <Grid item xs={12} md={6}>
          <SectorByCommunityTypeChart filterRegions={selectedRegions} />
        </Grid>
      </Grid>
    </Container>
  );
}
