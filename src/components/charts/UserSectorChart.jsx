import { useQuery } from "@tanstack/react-query";
import { Bar } from "react-chartjs-2";
import { Paper, Typography } from "@mui/material";
import { ghgKeys } from "../../services/queryKeyFactory";
import { http } from "../../services/http";

const UserSectorChart = ({ userId }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ghgKeys.userSector(userId),
    queryFn: () => http.get(`/api/ghg/user-summary/${userId}`).then(res => res.data),
  });

  if (isLoading) return <p className="text-center text-white">Loading sector data...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load sector chart.</p>;

  return (
    <Paper className="p-6 rounded-xl shadow-md bg-white">
      <Typography variant="h6" gutterBottom className="text-center font-bold">
        CO₂e Emissions by Sector
      </Typography>
      <Bar
        data={{
          labels: data.labels,
          datasets: data.datasets,
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: { display: false },
          },
        }}
      />
    </Paper>
  );
};

export default UserSectorChart;
