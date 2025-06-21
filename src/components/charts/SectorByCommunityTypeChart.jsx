import { useMemo, lazy } from "react";
import { Bar } from "react-chartjs-2";
import toast from "react-hot-toast";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardHeader, CardContent, Typography } from "@mui/material";

import { useSectoralByCommunityType } from "../../services/hooks";

const Loader = lazy(() => import("../../components/Loader"));

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);


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
  const { data, isLoading, isError, error } = useSectoralByCommunityType();

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

  const options = useMemo(
    () => ({
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
    }),
    []
  );

    if (isLoading) return <Loader />;
  if (isError || !data) {
    toast.error(error?.message || "Failed to load data");
    return null;
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
