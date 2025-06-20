import { useQuery } from "@tanstack/react-query";
import { Bar } from "react-chartjs-2";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";
import { http } from "../../services/http";

const fetchSectoralByRegion = async () => {
  const response = await http.get("/api/ghg/sectoral-by-region");
  return response.data;
};

export default function SectoralByRegionChart() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ghg", "sectoral-by-region"],
    queryFn: fetchSectoralByRegion,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <Box className="flex justify-center items-center h-64">
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !data) {
    return (
      <Box className="text-center text-red-500 py-4">Failed to load data.</Box>
    );
  }

  // Convert data into chart format
  const regions = Object.keys(data);
  const allSectors = Array.from(
    new Set(regions.flatMap((region) => data[region].labels))
  );

  const chartData = {
    labels: allSectors,
    datasets: regions.map((region, index) => ({
      label: region,
      data: allSectors.map((sector) => {
        const idx = data[region].labels.indexOf(sector);
        return idx !== -1 ? data[region].data[idx] : 0;
      }),
      backgroundColor: `hsl(${(index * 360) / regions.length}, 70%, 60%)`,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "GHG Emissions by Sector per Region",
      },
    },
  };

  return (
    <Paper elevation={3} className="p-4 shadow-md rounded-2xl">
      <Typography variant="h6" className="mb-4 text-gray-700">
        Sectoral GHG Emissions by Region
      </Typography>
      <div className="w-full overflow-x-auto">
        <Bar data={chartData} options={options} />
      </div>
    </Paper>
  );
}
