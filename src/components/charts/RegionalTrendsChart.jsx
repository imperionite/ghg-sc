import { useMemo, useState, lazy } from "react";
import { useQuery } from "@tanstack/react-query";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import toast from "react-hot-toast";

import RegionFilter from "../filters/RegionFilter";
import { getRegionalTrends } from "../../services/http";
import { ghgKeys } from "../../services/queryKeyFactory";
import { staticRegions } from "../../services/staticVars";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const Loader = lazy(() => import("../../components/Loader"));

const colourPalette = [
  "#4E8A8B", // Teal
  "#6F9A9B", // Soft Blue
  "#B1C6C5", // Light Grayish Blue
  "#A3D2CA", // Soft Cyan
  "#A8C0D6", // Light Blue
  "#9B9F99", // Olive Green
  "#BCC6A0", // Soft Green
  "#D1D7E0", // Light Lavender
  "#C0D0A1", // Sage Green
  "#B9D1B3", // Light Mint Green
];

export default function RegionalTrendsChart() {
  const [selectedRegions, setSelectedRegions] = useState([]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ghgKeys.regionalTrends(selectedRegions),
    queryFn: () => getRegionalTrends(selectedRegions),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const chartData = useMemo(() => {
    if (!data) return null;
    const allLabels = Array.from(
      new Set(Object.values(data).flatMap((r) => r.labels))
    ).sort();

    return {
      labels: allLabels,
      datasets: Object.entries(data).map(([region, values], index) => ({
        label: region,
        data: allLabels.map((date) => {
          const i = values.labels.indexOf(date);
          return i >= 0 ? values.data[i] : 0;
        }),
        borderColor: colourPalette[index % colourPalette.length], 
        backgroundColor: `${colourPalette[index % colourPalette.length]}80`, 
        fill: true, 
      })),
    };
  }, [data]);

  if (isLoading) return <Loader />;
  if (isError) {
    toast.error(error?.message || "An error occurred.");
    return <p className="text-red-500">Failed to load chart data.</p>;
  }

  return (
    <div className="p-4 shadow-lg bg-white rounded-xl">
      <RegionFilter
        regions={staticRegions}
        selectedRegions={selectedRegions}
        onChange={setSelectedRegions}
      />

      {isLoading || !chartData ? (
        <p>Loading chart...</p>
      ) : (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "bottom" },
              tooltip: { mode: 'index', intersect: false },
            },
            scales: {
              x: {
                grid: { display: false }, 
              },
              y: {
                grid: { color: "#e0e0e0" }, 
                ticks: {
                  color: "#333",
                  font: {
                    size: 12, 
                  },
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}
