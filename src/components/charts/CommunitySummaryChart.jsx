import { useQuery } from "@tanstack/react-query";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { http } from "../../services/http";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const fetchCommunitySummary = async () => {
  const response = await http.get("/api/ghg/community-summary");
  return response.data;
};

export default function CommunitySummaryChart() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["community-summary"],
    queryFn: fetchCommunitySummary,
  });

  if (isLoading) return <p className="text-gray-500">Loading...</p>;
  if (isError) return <p className="text-red-500">Failed to load data</p>;

  const labels = data.map((d) => `${d.city}, ${d.region}`);
  const emissions = data.map((d) => d.total_emissions);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Emissions (kg)",
        data: emissions,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "#36A2EB",
        borderWidth: 1,
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
