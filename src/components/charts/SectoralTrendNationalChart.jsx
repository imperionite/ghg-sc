import { lazy } from "react";
import { Line } from "react-chartjs-2";
import { Paper, Typography } from "@mui/material";
import toast from "react-hot-toast";

import { useSectoralTrend } from "../../services/hooks";

const Loader = lazy(() => import("../../components/Loader"));

export default function SectoralTrendNationalChart() {
  const { data, isLoading, isError, error } = useSectoralTrend();

  if (isLoading) return <Loader />;
  if (isError || !data) {
    toast.error(error?.message || "Failed to load data");
    return null;
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
      backgroundColor: `hsla(${
        (idx * 360) / sectorNames.length
      }, 70%, 70%, 0.5)`,
      fill: false,
      tension: 0.3,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "National Sectoral Emission Trends (CO2e)",
      },
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
