import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Button,
  CircularProgress,
  Box,
  Divider,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { http } from "../../services/http";
import { ghgKeys } from "../../services/queryKeyFactory";
import ReactMarkdown from "react-markdown";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const InterpretationCard = ({ autoTrigger = false }) => {
  const [enabled, setEnabled] = useState(autoTrigger);

  const {
    data,
    error,
    refetch,
    isFetching,
    isFetched,
  } = useQuery({
    queryKey: ghgKeys.interpretation,
    queryFn: () =>
      http.get(`/api/ghg/my-summary-interpret`).then((res) => res.data),
    enabled,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  useEffect(() => {
    if (autoTrigger && !isFetched) {
      setEnabled(true);
    }
  }, [autoTrigger, isFetched]);

  const handleManualTrigger = () => {
    setEnabled(true);
    refetch();
  };

  const interpretation = data?.ai_interpretation;
  const summaryText = data?.description; // substitute description from summary text properties
  const rawLabels = data?.raw_data?.labels || [];
  const rawValues = data?.raw_data?.data || [];

  // Combine and sort raw data
  const sortedRaw = rawLabels
    .map((label, idx) => ({ label, value: rawValues[idx] }))
    .sort((a, b) => b.value - a.value);

  const barData = {
    labels: sortedRaw.map((item) => item.label.toUpperCase()),
    datasets: [
      {
        label: "GHG Emissions (kg CO₂e)",
        data: sortedRaw.map((item) => item.value),
        backgroundColor: "#4CAF50",
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) =>
            `${ctx.dataset.label}: ${ctx.raw.toLocaleString()} kg CO₂e`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          callback: (value) => `${value} kg`,
          color: "#444",
        },
        title: {
          display: true,
          text: "Emissions (kg CO₂e)",
        },
      },
      y: {
        ticks: { color: "#444" },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Paper className="p-6 rounded-xl shadow-md bg-white min-h-[300px]">
      <Typography
        variant="h6"
        className="text-center font-bold text-gray-800 mb-4"
      >
        Interpretation & Recommendations to Offset Your Emission
      </Typography>

      {summaryText && (
        <Typography
          variant="body2"
          className="text-sm text-gray-600 mb-4 leading-relaxed"
        >
          <strong>Summary:</strong> {summaryText}
        </Typography>
      )}

      {!interpretation && !isFetching && (
        <Box className="flex justify-center mt-4">
          <Button
            variant="contained"
            onClick={handleManualTrigger}
            disabled={isFetching}
          >
            Generate Recommendation
          </Button>
        </Box>
      )}

      {isFetching && (
        <Box className="flex flex-col items-center justify-center mt-6">
          <CircularProgress size={36} />
          <Typography variant="body2" className="mt-2 text-gray-600">
            Fetching insights from the system's assistant...
          </Typography>
        </Box>
      )}

      {error && (
        <Typography className="text-red-500 text-center mt-4">
          Failed to load insights. Try again later.
        </Typography>
      )}

      {interpretation && !isFetching && (
        <>
          <Box className="mt-6 px-2 text-gray-800 leading-relaxed text-[0.95rem]">
            <ReactMarkdown
              children={interpretation}
              components={{
                li: ({ children }) => (
                  <li style={{ marginBottom: "6px", marginLeft: "1rem" }}>
                    • {children}
                  </li>
                ),
                ul: ({ children }) => (
                  <ul style={{ marginBottom: "1rem" }}>{children}</ul>
                ),
              }}
            />
          </Box>

          {/* Visualized Breakdown */}
          {sortedRaw.length > 0 && (
            <>
              <Divider className="my-6" />
              <Typography
                variant="subtitle1"
                className="text-center font-semibold text-gray-700 mb-3"
              >
                Breakdown of Your Total GHG Emissions
              </Typography>
              <Box className="h-[260px] px-2">
                <Bar data={barData} options={barOptions} />
              </Box>
            </>
          )}
        </>
      )}
    </Paper>
  );
};

export default InterpretationCard;
