import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Tabs,
  Tab,
  Box,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UserVsNationalChart from "./charts/UserVsNationalChart";
import UserSectorChart from "./charts/UserSectorChart";
import UserTrendChart from "./charts/UserTrendChart"; 
import InterpretationCard from "./charts/InterpretationCard";

const Transition = (props) => <Slide direction="up" {...props} />;

const VisualInsightsModal = ({ open, onClose, userId }) => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      PaperProps={{ className: "bg-gray-50" }}
    >
      <DialogTitle className="flex justify-between items-center text-white" style={{
            background: "linear-gradient(to bottom right, #3B8266,rgb(48, 97, 65))",
          }}>
        <span className="text-xl font-semibold">GHG Visual Insights</span>
        <IconButton edge="end" color="inherit" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Box className="bg-white">
        <Tabs
          value={tabIndex}
          onChange={(e, v) => setTabIndex(v)}
          variant="scrollable"
          scrollButtons="auto"
          className="border-b border-gray-300"
        >
          <Tab label="You vs National Avg" />
          <Tab label="CO₂e by Sector" />
          <Tab label="Your Emissions Over Time" />
          <Tab label="Recommendation" />
        </Tabs>
      </Box>

      <DialogContent className="overflow-y-auto">
        <Box className="w-full max-w-6xl mx-auto py-8 px-4">
          {tabIndex === 0 && (
            <Box style={{ height: 350 }}>
              <UserVsNationalChart userId={userId} />
            </Box>
          )}
          {tabIndex === 1 && (
            <Box style={{ height: 350 }}>
              <UserSectorChart userId={userId} />
            </Box>
          )}
          {tabIndex === 2 && (
            <Box style={{ height: 400 }}>
              <UserTrendChart userId={userId} />
            </Box>
          )}
          {tabIndex === 3 && (
            <Box style={{ height: 400 }}>
              <InterpretationCard />
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default VisualInsightsModal;
