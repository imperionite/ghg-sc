import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import { http } from "../../services/http";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const fetchSectorByCommunityType = async () => {
  const { data } = await http.get("/api/ghg/sectoral-by-community-type");
  return data;
};

const generateColor = (index) => {
  const palette = [
    "#36A2EB",
    "#FF6384",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#00C49F",
    "#E91E63",
    "#607D8B",
  ];
  return palette[index % palette.length];
};

export default function SectorByCommunityTypeChart() {
  const { data, isLoading } = useQuery({
    queryKey: ["sectoral-by-community-type"],
    queryFn: fetchSectorByCommunityType,
  });

  const chartData = useMemo(() => {
    if (!data) return null;
    const allSectors = Array.from(
      new Set(Object.values(data).flatMap((d) => d.labels))
    ).sort();

    const datasets = Object.entries(data).map(([commType, value], index) => {
      return {
        label: commType,
        data: allSectors.map((sector) => {
          const idx = value.labels.indexOf(sector);
          return idx >= 0 ? value.data[idx] : 0;
        }),
        backgroundColor: generateColor(index),
      };
    });

    return {
      labels: allSectors,
      datasets,
    };
  }, [data]);

  const options = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Sector",
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Total Emissions (kg CO2e)",
        },
      },
    },
  }), []);

  if (isLoading || !chartData) {
    return (
      <div className="p-4">
        <Typography variant="body2">Loading sectoral emissions by community type...</Typography>
      </div>
    );
  }

  return (
    <Card className="w-full shadow-lg rounded-2xl">
      <CardHeader
        title={
          <Typography variant="h6" className="font-semibold">
            Sectoral Emissions by Community Type
          </Typography>
        }
      />
      <CardContent>
        <div className="w-full overflow-x-auto">
          <Bar data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
