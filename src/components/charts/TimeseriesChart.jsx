import { useQuery } from "@tanstack/react-query";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { http } from "../../services/http";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const fetchTimeseries = async () => {
  const res = await http.get("/api/ghg/timeseries");
  return res.data;
};

export default function TimeseriesChart() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["ghg", "timeseries"],
    queryFn: fetchTimeseries,
  });

  if (isLoading) return <div className="text-center p-4">Loading chart...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error loading chart</div>;

  const chartData = {
    labels: data.labels,
    datasets: data.datasets.map((ds) => ({
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

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Community GHG Emissions Over Time</h2>
      <Line data={chartData} options={options} />
    </div>
  );
} 
