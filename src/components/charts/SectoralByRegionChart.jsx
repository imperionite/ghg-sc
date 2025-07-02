import { lazy } from "react";
import { Bar } from "react-chartjs-2";
import { Typography, Paper } from "@mui/material";
import toast from "react-hot-toast";

import { useSectoralByRegion } from "../../services/hooks";

const Loader = lazy(() => import("../../components/Loader"));

export default function SectoralByRegionChart() {
  const { data, isLoading, isError, error } = useSectoralByRegion();

  if (isLoading) return <Loader />;
  if (isError || !data) {
    toast.error(error?.message || "Failed to load data");
    return null;
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
    <Paper elevation={3} className="p-4 mt-5 shadow-md rounded-2xl">
      <Typography variant="h6" className="mb-4 text-gray-700">
        Sectoral GHG Emissions by Region
      </Typography>
      <div className="w-full overflow-x-auto">
        <Bar data={chartData} options={options} />
      </div>
    </Paper>
  );
}
