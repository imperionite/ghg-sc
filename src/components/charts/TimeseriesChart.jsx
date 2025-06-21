import { lazy } from "react";
import { Line } from "react-chartjs-2";
import toast from "react-hot-toast";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useTimeseries } from "../../services/hooks";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const Loader = lazy(() => import("../../components/Loader"));
export default function TimeseriesChart() {
  const { data, isLoading, error, isError } = useTimeseries();

  const chartData = {
    labels: data?.labels,
    datasets: data?.datasets.map((ds) => ({
      ...ds,
      fill: true,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Total CO₂e (kg)" },
      },
      x: {
        title: { display: true, text: "Date" },
      },
    },
  };

  if (isLoading) return <Loader />;
  if (isError) {
    toast.error(error?.message || "Failed to load chart data!");
    return <p className="text-red-500">Failed to load chart data.</p>;
  }

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        Community GHG Emissions Over Time
      </h2>
      <Line data={chartData} options={options} />
    </div>
  );
}
