import { lazy, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Paper,
  Box,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { useAtomValue } from "jotai";
import toast from "react-hot-toast";

import { deleteUser } from "../services/http";
import { useUserProfile } from "../services/hooks";
import { authAtom } from "../services/atoms";
import { userKeys, ghgKeys } from "../services/queryKeyFactory";

import VisualInsightsModal from "../components/VisualInsightsModal";

const Loader = lazy(() => import("../components/Loader"));

const UserProfile = () => {
  const queryClient = useQueryClient();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openInsights, setOpenInsights] = useState(false);
  const navigate = useNavigate();
  const auth = useAtomValue(authAtom);
  const { data, isLoading, isError, error } = useUserProfile(auth);

  const mutation = useMutation({
    mutationFn: () => deleteUser(auth?.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      queryClient.invalidateQueries({ queryKey: ghgKeys.all });
      setOpenConfirm(false);
      toast.success("User deactivated successfully!");
      navigate("/");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.detail ||
        error.message ||
        "Deactivation failed! Please try again.";
      toast.error(errorMessage);
    },
  });

  if (isLoading) return <Loader />;
  if (isError) {
    toast.error(error?.message || error?.detail || "An error occurred.");
    return (
      <p className="text-red-600 text-center mt-10 font-semibold">
        Failed to load user profile.
      </p>
    );
  }

  return (
    <>
      <div className="p-6 max-w-3xl mx-auto">
        <Paper
          elevation={12}
          className="p-10 rounded-3xl shadow-xl relative"
          style={{
            background: "linear-gradient(to bottom right, #3B8266, #4D9B69)",
          }}
        >
          <Box
            className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-30 rounded-3xl"
            style={{ zIndex: 0 }}
          />
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            className="text-center font-extrabold text-white tracking-wide relative"
            sx={{ fontSize: "2.5rem", letterSpacing: "0.5px" }}
          >
            User Profile
          </Typography>

          <Box className="flex justify-center mb-8">
            <Avatar
              alt={data?.username}
              src={data?.profile_image || "/default-avatar.png"}
              sx={{ width: 120, height: 120 }}
            />
          </Box>

          <Box
            component="section"
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative"
          >
            {[
              { label: "Username", value: data?.username },
              {
                label: "Community",
                value: data?.community_name
                  ? `${data.community_name} (${data.community_type})`
                  : "N/A",
              },
              { label: "Region", value: data?.region || "N/A" },
              { label: "City", value: data?.city || "N/A" },
            ].map(({ label, value }) => (
              <Box key={label} className="space-y-2">
                <Typography
                  variant="subtitle2"
                  className="text-gray-100 uppercase tracking-wider font-semibold"
                >
                  {label}
                </Typography>
                <Typography
                  variant="body1"
                  className="text-gray-200 font-medium"
                  sx={{ fontSize: "1.2rem", lineHeight: 1.6 }}
                >
                  {value}
                </Typography>
              </Box>
            ))}
          </Box>

          <Divider className="my-10 border-gray-400" />

          <Box className="flex justify-center mt-8 gap-4">
            <Button
              variant="outlined"
              color="warning"
              onClick={() => setOpenConfirm(true)}
              disabled={mutation.isLoading}
              startIcon={
                mutation.isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null
              }
            >
              {mutation.isLoading ? "Deleting..." : "Delete Account"}
            </Button>

            <Button
              variant="contained"
              color="success"
              onClick={() => setOpenInsights(true)}
            >
              View GHG Visual Insights
            </Button>
          </Box>

          <Dialog
            open={openConfirm}
            onClose={() => setOpenConfirm(false)}
            PaperProps={{
              sx: { borderRadius: 3, padding: 2 },
            }}
          >
            <DialogTitle className="font-bold text-red-600">
              Confirm Account Deletion
            </DialogTitle>
            <DialogContent>
              <DialogContentText className="text-gray-700 dark:text-gray-300">
                Are you sure you want to delete your account? This action is
                irreversible and you will lose access to your data.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenConfirm(false)} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => mutation.mutate()}
                color="error"
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? "Deleting..." : "Delete"}
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </div>

      {/* Visual Analytics Modal */}
      <VisualInsightsModal
        open={openInsights}
        onClose={() => setOpenInsights(false)}
        userId={auth?.id}
      />
    </>
  );
};

export default UserProfile;
