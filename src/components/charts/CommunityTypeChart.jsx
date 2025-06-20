// src/components/charts/CommunityTypeChart.js
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { http } from "../../services/http";
import { Card, CardContent } from "@mui/material";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const fetchCommunityTypeData = async () => {
  const res = await http.get("/api/ghg/aggregated-by-type");
  return res.data;
};

export default function CommunityTypeChart() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["community-type-summary"],
    queryFn: fetchCommunityTypeData,
  });

  if (isLoading) return <div className="text-sm text-gray-600">Loading...</div>;
  if (error) return <div className="text-red-500">Error loading data</div>;

  const labels = data.map((item) => item.community_type);
  const emissions = data.map((item) => item.total_emissions);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Emissions (kg CO2e)",
        data: emissions,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
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
        <h2 className="text-lg font-semibold mb-2">Emissions by Community Type</h2>
        <Bar data={chartData} options={options} />
      </CardContent>
    </Card>
  );
}
