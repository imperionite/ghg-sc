import { lazy } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import toast from "react-hot-toast";
import { Card, CardContent } from "@mui/material";


import { useCommunityTypeSummary } from "../../services/hooks";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Filler);

const Loader = lazy(() => import("../../components/Loader"));


export default function CommunityTypeChart() {
  const { data, isLoading, isError, error } = useCommunityTypeSummary()

  if (isLoading) return <Loader />;
  if (isError || !data) {
    toast.error(error?.message || "Failed to load data");
    return null;
  }

  const labels = data.map((item) => item.community_type);
  const emissions = data.map((item) => item.total_emissions);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Emissions (kg CO2e)",
        data: emissions,
        backgroundColor: "rgba(226, 233, 240, 0.5)",
        borderColor: "rgb(115, 141, 184)",
        borderWidth: 1,
        fill: true
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Emissions (kg CO2e)" },
      },
      x: {
        title: { display: true, text: "Community Type" },
      },
    },
  };

  return (
    <Card className="mt-4 shadow-md">
      <CardContent>
        <h2 className="text-lg font-semibold mb-2">
          Emissions by Community Type
        </h2>
        <Bar data={chartData} options={options} />
      </CardContent>
    </Card>
  );
}
