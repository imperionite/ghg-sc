import { lazy } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import toast from "react-hot-toast";

import { useCommunitySummary } from "../../services/hooks";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const Loader = lazy(() => import("../../components/Loader"));

export default function CommunitySummaryChart() {
  const { data, isLoading, isError, error } = useCommunitySummary();

  if (isLoading) return <Loader />;
  if (isError || !data) {
    toast.error(error?.message || "Failed to load data");
    return null;
  }

  const labels = data.map((d) => `${d.city}, ${d.region}`);
  const emissions = data.map((d) => d.total_emissions);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Emissions (kg)",
        data: emissions,
        backgroundColor: "rgba(187, 197, 204, 0.6)",
        borderColor: "rgba(104, 241, 170, 0.6)",
        borderWidth: 1,
        fill: true
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Community Emissions Summary by City & Region",
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <Bar data={chartData} options={options} />
    </div>
  );
}