import { useQuery } from "@tanstack/react-query";
import { Line } from "react-chartjs-2";
import { Paper, Typography } from "@mui/material";
import { ghgKeys } from "../../services/queryKeyFactory";
import { http } from "../../services/http";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const sectorColors = {
  waste: "#8BC34A",
  ippu: "#FF9800",
  energy: "#03A9F4",
  agriculture: "#9C27B0",
  transport: "#F44336",
};

const UserTrendChart = ({ userId }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ghgKeys.userTrend(userId),
    queryFn: () =>
      http.get(`/api/ghg/user-trend/${userId}`).then((res) => res.data),
  });

  if (isLoading) return <p className="text-center text-white">Loading trends...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load trend chart.</p>;

  const combinedLabels = Array.from(
    new Set(Object.values(data).flatMap((sector) => sector.labels))
  ).sort();

  const datasets = Object.entries(data).map(([sector, sectorData]) => ({
    label: sector.charAt(0).toUpperCase() + sector.slice(1),
    data: combinedLabels.map((label) => {
      const index = sectorData.labels.indexOf(label);
      return index !== -1 ? sectorData.data[index] : null;
    }),
    borderColor: sectorColors[sector] || "#000",
    backgroundColor: sectorColors[sector] + "88",
    tension: 0.4,
    fill: false,
    spanGaps: true,
    pointRadius: 2,
    borderWidth: 2,
  }));

  return (
    <Paper className="p-6 rounded-xl shadow-md bg-white">
      <Typography variant="h6" gutterBottom className="text-center font-bold">
        Emissions Trend Over Time
      </Typography>
      <div style={{ height: "320px" }}>
        <Line
          data={{
            labels: combinedLabels,
            datasets,
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: "top" },
              tooltip: { mode: "index", intersect: false },
            },
            scales: {
              x: {
                title: { display: true, text: "Date" },
                ticks: {
                  maxTicksLimit: 10,
                  maxRotation: 45,
                  minRotation: 30,
                },
              },
              y: {
                title: { display: true, text: "kg CO₂e" },
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </Paper>
  );
};

export default UserTrendChart;
