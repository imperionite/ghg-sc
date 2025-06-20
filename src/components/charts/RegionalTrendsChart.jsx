import React, { useMemo, useState } from "react";
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
} from "chart.js";
import { http } from "../../services/http";
import RegionFilter from "../filters/RegionFilter";
import { staticRegions } from "../../services/staticVars";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const fetchRegionalTrends = async (regions) => {
  const params = regions.length ? { regions } : {};
  const { data } = await http.get("/api/ghg/regional-trend-summary", { params });
  return data;
};

export default function RegionalTrendsChart() {
  const [selectedRegions, setSelectedRegions] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["regional-trends", selectedRegions],
    queryFn: () => fetchRegionalTrends(selectedRegions),
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
        borderColor: `hsl(${index * 60}, 70%, 50%)`,
        backgroundColor: `hsla(${index * 60}, 70%, 50%, 0.4)`,
        fill: false,
      })),
    };
  }, [data]);

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
            plugins: { legend: { position: "bottom" } },
          }}
        />
      )}
    </div>
  );
}
