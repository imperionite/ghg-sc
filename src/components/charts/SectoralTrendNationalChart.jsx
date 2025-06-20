import { useQuery } from "@tanstack/react-query";
import { Line } from "react-chartjs-2";
import { Paper, Typography, CircularProgress, Box } from "@mui/material";
import { http } from "../../services/http";

const fetchSectoralTrend = async () => {
  const res = await http.get("/api/ghg/sectoral-trend");
  return res.data;
};

export default function SectoralTrendNationalChart() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ghg", "sectoral-trend"],
    queryFn: fetchSectoralTrend,
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

  const sectorNames = Object.keys(data);

  const allDates = Array.from(
    new Set(sectorNames.flatMap((s) => data[s].labels))
  ).sort();

  const chartData = {
    labels: allDates,
    datasets: sectorNames.map((sector, idx) => ({
      label: sector,
      data: allDates.map((date) => {
        const i = data[sector].labels.indexOf(date);
        return i !== -1 ? data[sector].data[i] : 0;
      }),
      borderColor: `hsl(${(idx * 360) / sectorNames.length}, 70%, 50%)`,
      backgroundColor: `hsla(${(idx * 360) / sectorNames.length}, 70%, 70%, 0.5)`,
      fill: false,
      tension: 0.3,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "National Sectoral Emission Trends (CO2e)" },
    },
    interaction: { mode: "index", intersect: false },
    scales: {
      y: {
        title: {
          display: true,
          text: "Emissions (kg CO2e)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
    },
  };

  return (
    <Paper elevation={3} className="p-4 shadow-md rounded-2xl">
      <Typography variant="h6" className="mb-4 text-gray-700">
        National GHG Trends by Sector
      </Typography>
      <Line data={chartData} options={options} />
    </Paper>
  );
}
