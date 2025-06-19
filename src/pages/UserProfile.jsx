import {
  CircularProgress,
  Typography,
  Paper,
  Box,
  Divider,
} from "@mui/material";
import { useAtomValue } from "jotai";

import { useUserProfile } from "../services/hooks";

import { authAtom } from "../services/atoms";

const UserProfile = () => {
  const auth = useAtomValue(authAtom);
  const { data, isLoading, error } = useUserProfile(auth?.token);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-4 text-red-500">
        <Typography variant="h6">Error fetching profile</Typography>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Paper elevation={3} className="p-8 shadow-lg rounded-lg">
        <Typography
          variant="h4"
          gutterBottom
          className="text-center font-semibold"
        >
          User Profile
        </Typography>

        <Box className="mb-6">
          <Typography variant="h6" className="text-gray-700">
            <span className="font-bold">Username:</span> {data.username}
          </Typography>
        </Box>

        <Box className="mb-6">
          <Typography variant="h6" className="text-gray-700">
            <span className="font-bold">Community:</span> {data.community_name}{" "}
            ({data.community_type})
          </Typography>
        </Box>

        <Box className="mb-6">
          <Typography variant="h6" className="text-gray-700">
            <span className="font-bold">Region:</span> {data.region}
          </Typography>
        </Box>

        <Box className="mb-6">
          <Typography variant="h6" className="text-gray-700">
            <span className="font-bold">City:</span> {data.city}
          </Typography>
        </Box>

        <Divider className="my-6" />

        <Box className="text-center">
          <Typography variant="body1" className="text-gray-500">
            Profile loaded successfully!
          </Typography>
        </Box>
      </Paper>
    </div>
  );
};

export default UserProfile;
