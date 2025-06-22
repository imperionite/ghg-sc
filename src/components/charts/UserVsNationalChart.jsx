import { useQuery } from "@tanstack/react-query";
import { Paper, Typography, Box } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import { http } from "../../services/http";
import { ghgKeys } from "../../services/queryKeyFactory";

const chartHeight = 300; // Fixed height

const UserVsNationalChart = ({ userId }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ghgKeys.userComparison(userId),
    queryFn: () =>
      http.get(`/api/ghg/compare-user-to-average/${userId}`).then(res => res.data),
  });

  if (isLoading)
    return <p className="text-center text-gray-600">Loading comparison...</p>;
  if (error)
    return <p className="text-center text-red-500">Failed to load chart data.</p>;

  return (
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        className="text-center font-bold text-gray-700"
      >
        You vs. National Average (kg CO₂e)
      </Typography>
      <Box style={{ height: chartHeight, width: "100%" }}>
        <Bar
          data={{
            labels: data.map(item => item.sector),
            datasets: [
              {
                label: "Your Emissions",
                data: data.map(item => item.user_total),
                backgroundColor: "#36A2EB",
              },
              {
                label: "National Avg",
                data: data.map(item => item.national_avg),
                backgroundColor: "#FF6384",
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: "top" },
              tooltip: {
                callbacks: {
                  label: context =>
                    `${context.dataset.label}: ${context.raw.toLocaleString()} kg`,
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: value => `${value} kg`,
                },
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default UserVsNationalChart;
